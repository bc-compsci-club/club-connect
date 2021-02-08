import { NextFunction, Request, Response, Router } from 'express';
import multer from 'multer';
import { body, query, validationResult } from 'express-validator';
import { paramCase } from 'change-case';
import normalizeUrl from 'normalize-url';
import sgMail from '@sendgrid/mail';
import cloneDeep from 'lodash.clonedeep';
import validator from 'validator';

import ClubEventModel, { ClubEventInstance } from '../models/ClubEvent.model';
import ClubEventRequestModel, {
  ClubEventRequestInstance,
} from '../models/ClubEventRequest.model';
import { RegisteredMemberInstance } from '../models/RegisteredMember.model';
import ac, { Resources, Roles } from '../security/accessControl';
import authenticateJwt from '../middleware/authenticateJwt';
import { processImageAndPublicize } from '../util/googleCloudStorageUtils';
import { generateEventRequestEmail } from '../util/generateEmails';
import { multerImageOptions } from '../common/multerOptions';
import {
  memberImageOptions,
  rectangularImageOptions,
} from '../common/imageProcessorOptions';
import { FormMultipartBody, IdParams } from '../types';
import { RequestStatuses } from '../enums';
import { FindOptions } from 'sequelize';

const eventsRouter = Router();

// Request Queries
interface EventsQuery {
  limit?: number;
  detailed?: boolean;
}

// Other interfaces
// Club events sorted into upcoming and past events
interface CategorizedClubEvents {
  upcomingEvents: ClubEventInstance[];
  pastEvents: ClubEventInstance[];
}

// Validations
const eventGetValidation = [
  query('limit').optional().isInt({ min: 1 }).toInt(),
  query('detailed').optional().isBoolean().toBoolean(),
];

// Multer Uploads
const multerUpload = multer({
  storage: multer.diskStorage(multerImageOptions),
});
const createUpdateEventUpload = multerUpload.fields([
  {
    name: 'bannerFile',
    maxCount: 1,
  },
  {
    name: 'presenterImageFile',
    maxCount: 1,
  },
]);

const multerRequestEventFields = multerUpload.fields([
  {
    name: 'bannerFile',
    maxCount: 1,
  },
]);

/**
 * Gets a list of club events.
 *
 * @route GET /events
 */
eventsRouter.get(
  '/',
  eventGetValidation,
  async (
    req: Request<{}, {}, {}, EventsQuery>,
    res: Response,
    next: NextFunction
  ) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json(validationErrors.array());
    }

    // Configure event find options
    const findOptions: FindOptions = {
      attributes: [
        'id',
        'internalName',
        'title',
        'banner',
        'startDateTime',
        'endDateTime',
      ],
      order: [['startDateTime', 'DESC']],
      limit: req.query.limit ? req.query.limit : 25,
    };

    if (req.query.detailed) {
      // Omitting the attributes key returns all attributes
      delete findOptions.attributes;
    }

    // Get events and return them
    let events: ClubEventInstance[];
    try {
      events = await ClubEventModel.findAll(findOptions);
    } catch (err) {
      return next(err);
    }

    return res.json(events);
  }
);

/**
 * Get a list of events categorized for the event browser
 *
 * @route GET /events/browser
 */
eventsRouter.get(
  '/browser',
  eventGetValidation,
  async (
    req: Request<{}, {}, {}, EventsQuery>,
    res: Response,
    next: NextFunction
  ) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json(validationErrors.array());
    }

    // Get events sorted by their start date
    let clubEvents: ClubEventInstance[];
    try {
      clubEvents = await ClubEventModel.findAll({
        attributes: [
          'id',
          'internalName',
          'title',
          'banner',
          'startDateTime',
          'endDateTime',
        ],
        order: [['startDateTime', 'DESC']],
        limit: req.query.limit ? req.query.limit : 25,
      });
    } catch (err) {
      return next(err);
    }

    // Categorize events by determining which events have passed and sorting accordingly
    const categorizedClubEvents: CategorizedClubEvents = {
      upcomingEvents: [],
      pastEvents: [],
    };

    const currentDateTime = new Date();
    clubEvents.forEach((clubEvent) => {
      if (clubEvent.endDateTime && clubEvent.endDateTime < currentDateTime) {
        categorizedClubEvents.pastEvents.push(clubEvent);
      } else {
        categorizedClubEvents.upcomingEvents.push(clubEvent);
      }
    });

    return res.json(categorizedClubEvents);
  }
);

/**
 * Gets a specific event by it's ID.
 *
 * @route GET /events/:id
 */
eventsRouter.get(
  '/:id',
  async (req: Request<IdParams>, res: Response, next: NextFunction) => {
    let foundEvent: ClubEventInstance | null;
    try {
      foundEvent = await ClubEventModel.findOne({
        where: { id: req.params.id },
      });
    } catch (err) {
      return next(err);
    }

    if (foundEvent === null) {
      return res.sendStatus(404);
    }

    return res.json(foundEvent);
  }
);

/**
 * Creates a new event in the database.
 *
 * @route POST /events
 */
eventsRouter.post(
  '/',
  authenticateJwt,
  createUpdateEventUpload,
  async (
    req: Request<{}, {}, FormMultipartBody>,
    res: Response,
    next: NextFunction
  ) => {
    const member = req.user as RegisteredMemberInstance;

    const permission = ac
      .can(Roles[member.role])
      .createAny(Resources.ClubEvents);
    if (!permission.granted) {
      return res.sendStatus(403);
    }

    // req.body.formData is stringified JSON
    // Parse it and validate submitted form data
    const parsedBody = JSON.parse(req.body.formDataJson);
    const validationErrors: string[] = [];

    if (!validator.isLength(parsedBody.title, { min: 1, max: 250 })) {
      validationErrors.push('Title must be less than 250 characters');
    }

    if (validationErrors.length > 0) {
      return res.status(400).json(validationErrors);
    }

    parsedBody.title = validator.trim(parsedBody.title);

    const uploadedFiles = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    // Generate internal name if none was provided
    if (!parsedBody.useCustomInternalName) {
      parsedBody.internalName = paramCase(parsedBody.title);
    }
    // Remove useCustomInternalName before adding to DB
    delete parsedBody.useCustomInternalName;

    // Ensure external link is formatted properly if it was submitted
    if (parsedBody.externalLink) {
      parsedBody.externalLink = normalizeUrl(parsedBody.externalLink);
    }

    // Upload banner and presenter image to Google Cloud Storage if they were submitted
    if (uploadedFiles['bannerFile']) {
      const bannerFile = uploadedFiles['bannerFile'][0];

      parsedBody.banner = await processImageAndPublicize(
        bannerFile,
        process.env.GCS_EVENT_BANNERS_DIR as string,
        rectangularImageOptions
      );
    }

    if (uploadedFiles['presenterImageFile']) {
      const presenterImage = uploadedFiles['presenterImageFile'][0];

      parsedBody.presenterImage = await processImageAndPublicize(
        presenterImage,
        process.env.GCS_EVENT_PRESENTER_IMAGES_DIR as string,
        memberImageOptions
      );
    }

    // Save the event in the database
    let result: ClubEventInstance;
    try {
      result = await ClubEventModel.create(parsedBody);
    } catch (err) {
      return next(err);
    }

    // Build resulting event location and set Location header
    const createdEventLocation = `/events/${result.id}/${result.internalName}`;

    res.set('Location', createdEventLocation);
    return res.sendStatus(201);
  }
);

/**
 * Updates an event.
 * @route PUT /events/:id
 */
eventsRouter.put(
  '/:id',
  authenticateJwt,
  createUpdateEventUpload,
  async (req: Request<IdParams>, res: Response, next: NextFunction) => {
    const member = req.user as RegisteredMemberInstance;

    // Check if the user can update club events
    const permission = ac
      .can(Roles[member.role])
      .updateAny(Resources.ClubEvents);
    if (!permission.granted) {
      return res.sendStatus(403);
    }

    // req.body.formData is stringified JSON
    // Parse it and prepare the data to be saved
    const parsedBody = JSON.parse(req.body.formDataJson);

    const uploadedFiles = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    // Generate internal name if none was provided
    if (!parsedBody.useCustomInternalName) {
      parsedBody.internalName = paramCase(parsedBody.title);
    }
    // Remove useCustomInternalName before adding to DB
    delete parsedBody.useCustomInternalName;

    // Ensure external link is formatted properly if it was submitted
    if (parsedBody.externalLink) {
      parsedBody.externalLink = normalizeUrl(parsedBody.externalLink);
    }

    // Upload banner and presenter image to Google Cloud Storage if they were submitted
    if (uploadedFiles['bannerFile']) {
      const bannerFile = uploadedFiles['bannerFile'][0];

      parsedBody.banner = await processImageAndPublicize(
        bannerFile,
        process.env.GCS_EVENT_BANNERS_DIR as string,
        rectangularImageOptions
      );
    }

    if (uploadedFiles['presenterImageFile']) {
      const presenterImage = uploadedFiles['presenterImageFile'][0];

      parsedBody.presenterImage = await processImageAndPublicize(
        presenterImage,
        process.env.GCS_EVENT_PRESENTER_IMAGES_DIR as string,
        memberImageOptions
      );
    }

    // Update the event in the database
    try {
      await ClubEventModel.update(parsedBody, { where: { id: req.params.id } });
    } catch (err) {
      return next(err);
    }

    return res.sendStatus(200);
  }
);

/**
 * Creates a new event request.
 * @route POST /accounts/request
 */
eventsRouter.post(
  '/request',
  authenticateJwt,
  multerRequestEventFields,
  async (req: Request, res: Response, next: NextFunction) => {
    // If auth was successful, then we got back a UserInstance
    const member = req.user as RegisteredMemberInstance;

    // req.body.formData is stringified JSON, deserialize to process
    const parsedBody = JSON.parse(req.body.formDataJson);

    // Process the data before storing
    const dataToProcess = {
      internalName: parsedBody.internalName,
      externalLink: parsedBody.externalLink,
      banner: '',
    };

    // Generate internal name if it doesn't exist
    if (!parsedBody.useCustomInternalName) {
      dataToProcess.internalName = paramCase(parsedBody.title);
    }

    // Normalize external link
    dataToProcess.externalLink = normalizeUrl(parsedBody.externalLink);

    // Upload banner to Google Cloud Storage and save banner path
    const uploadedFiles = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    try {
      const bannerFile = uploadedFiles['bannerFile'][0];

      dataToProcess.banner = await processImageAndPublicize(
        bannerFile,
        process.env.GCS_EVENT_BANNERS_DIR as string,
        rectangularImageOptions
      );
    } catch (err) {
      console.error(err);
      return res.sendStatus(502);
    }

    // Save the request in the event requests database
    const eventRequestData = {
      requestStatus: RequestStatuses.Pending,
      title: parsedBody.title,
      presentingMemberId: member.memberId,
      startDateTime: parsedBody.startDateTime,
      endDateTime: parsedBody.endDateTime,
      eventLocation: parsedBody.eventLocation,
      shortDescription: parsedBody.shortDescription,
      longDescription: parsedBody.longDescription,
      externalLinkButtonText: parsedBody.externalLinkButtonText,
      ...dataToProcess,
    };

    let createdRequest: ClubEventRequestInstance;
    try {
      createdRequest = await ClubEventRequestModel.create(eventRequestData);
    } catch (err) {
      return next(err);
    }

    // Email event request to admins
    const eventRequestEmail = generateEventRequestEmail(
      member,
      createdRequest,
      createdRequest.requestNumber ? createdRequest.requestNumber : 0
    );

    try {
      await sgMail.send(eventRequestEmail);
    } catch (err) {
      return next(err);
    }

    return res.sendStatus(200);
  }
);

// Delete event
eventsRouter.delete(
  '/:id',
  authenticateJwt,
  async (req: Request, res: Response, next: NextFunction) => {
    const member = req.user as RegisteredMemberInstance;

    // Check if the user can delete event
    const permission = ac
      .can(Roles[member.role])
      .deleteAny(Resources.ClubEvents);
    if (!permission.granted) {
      return res.sendStatus(403);
    }

    // User has permission, proceed to delete the event
    // Check if event exists since we don't want to return 200 OK for "deleting" a nonexistent event
    let existingEvent: ClubEventInstance | null;
    try {
      existingEvent = await ClubEventModel.findOne({
        where: { id: req.params.id },
      });
    } catch (err) {
      return next(err);
    }

    if (existingEvent === null) {
      // An event with the ID does not exist, cannot delete
      return res.sendStatus(404);
    }

    // Event exists, proceed to delete it
    try {
      await ClubEventModel.destroy({
        where: { id: req.params.id },
      });
    } catch (err) {
      return next(err);
    }

    return res.sendStatus(200);
  }
);

const prepareEventData = async (
  submittedEventData: Record<string, any>,
  uploadedFiles: {
    [fieldname: string]: Express.Multer.File[];
  }
) => {
  const preparedEventData = cloneDeep(submittedEventData);

  // Generate internal name if none was provided
  if (!preparedEventData.useCustomInternalName) {
    preparedEventData.internalName = paramCase(preparedEventData.title);
  }
  // Remove useCustomInternalName before adding to DB
  delete preparedEventData.useCustomInternalName;

  // Ensure external link is formatted properly if it was submitted
  if (preparedEventData.externalLink) {
    preparedEventData.externalLink = normalizeUrl(
      preparedEventData.externalLink
    );
  }

  // Upload banner and presenter image to Google Cloud Storage if they were submitted
  if (uploadedFiles['bannerFile']) {
    const bannerFile = uploadedFiles['bannerFile'][0];

    preparedEventData.banner = await processImageAndPublicize(
      bannerFile,
      process.env.GCS_EVENT_BANNERS_DIR as string,
      rectangularImageOptions
    );
  }

  if (uploadedFiles['presenterImageFile']) {
    const presenterImage = uploadedFiles['presenterImageFile'][0];

    preparedEventData.presenterImage = await processImageAndPublicize(
      presenterImage,
      process.env.GCS_EVENT_PRESENTER_IMAGES_DIR as string,
      memberImageOptions
    );
  }

  return preparedEventData;
};

export default eventsRouter;
