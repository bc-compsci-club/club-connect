import { NextFunction, Request, Response, Router } from 'express';
import { FindOptions, Op } from 'sequelize';
import { body, query, validationResult } from 'express-validator';
import axios from 'axios';
import { paramCase } from 'change-case';

import AnnouncementModel, {
  AnnouncementInstance,
} from '../models/Announcement.model';
import { RegisteredMemberInstance } from '../models/RegisteredMember.model';
import authenticateJwt from '../middleware/authenticateJwt';
import ac, { Resources, Roles } from '../security/accessControl';
import { IdParams } from '../types';

const announcementsRouter = Router();

// Request Queries
// Queries must be strings
interface AnnouncementQuery {
  role?: Roles.Member | Roles.BrooklynCollegeMember;
  limit?: string;
  detailed?: string;
}

// Request Bodies
interface AnnouncementBody {
  internalName?: string;
  useCustomInternalName: boolean;
  title: string;
  headline: string;
  body: string;
  role: Roles;
}

const announcementPostValidation = [
  body('internalName').optional().notEmpty().isLength({ max: 250 }).trim(),
  body('title').notEmpty().isLength({ max: 250 }).trim(),
  body('headline').notEmpty().isLength({ max: 250 }).trim(),
  body('body').notEmpty().isLength({ max: 2000 }).trim(),
  body('useCustomInternalName').isBoolean(),
  body('role').notEmpty().isIn([Roles.Member, Roles.BrooklynCollegeMember]),
];

const announcementQueryValidation = [
  query('role').optional().isIn([Roles.Member, Roles.BrooklynCollegeMember]),
  query('limit').optional().isInt(),
  query('detailed').optional().isBoolean(),
];

/**
 * Get a list of announcements.
 *
 * Query params:
 * role?: One of the roles in the Roles enum to return only announcements for the queried role
 * limit?: The limit on announcements to return.
 * detailed?: "true" or "false" for whether or not to return extended announcement info
 *
 * @route GET /announcements
 */
announcementsRouter.get(
  '/',
  announcementQueryValidation,
  authenticateJwt,
  async (
    req: Request<{}, {}, {}, AnnouncementQuery>,
    res: Response,
    next: NextFunction
  ) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json(validationErrors.array());
    }

    const member = req.user as RegisteredMemberInstance;

    const whereClause = getWhereBasedOnRole(member, req.query.role);

    if (whereClause === undefined) {
      // No access
      return res.sendStatus(403);
    }

    if (whereClause === null) {
      // The role doesn't exist
      return res.sendStatus(404);
    }

    let options: FindOptions<AnnouncementInstance> = {
      where: { role: whereClause },
      order: [['updatedAt', 'DESC']],
      limit: req.query.limit ? parseInt(req.query.limit) : 25,
    };

    if (req.query.detailed !== 'true') {
      // Don't include announcement body for non-detailed response
      options.attributes = [
        'id',
        'internalName',
        'title',
        'headline',
        'createdAt',
        'updatedAt',
      ];
    }

    let announcements: AnnouncementInstance[] | null;
    try {
      announcements = await AnnouncementModel.findAll(options);
    } catch (err) {
      return next(err);
    }

    if (announcements === null) {
      return res.json([]);
    } else {
      return res.json(announcements);
    }
  }
);

/**
 * Get specific announcement by numeric id
 *
 * @route GET /announcements/:id
 */
announcementsRouter.get(
  '/:id',
  authenticateJwt,
  async (req: Request<IdParams>, res: Response, next: NextFunction) => {
    const member = req.user as RegisteredMemberInstance;
    let announcement: AnnouncementInstance | null;
    try {
      announcement = await AnnouncementModel.findOne({
        where: { id: req.params.id },
      });
    } catch (err) {
      return next(err);
    }

    // Check if announcement exists
    if (announcement === null) {
      return res.sendStatus(404);
    }

    // Check if the announcement is BC only and the member can access it
    if (announcement.role === Roles.BrooklynCollegeMember) {
      const permissionForBcAnnouncements = ac
        .can(Roles[member.role])
        .readAny(Resources.BrooklynCollegeAnnouncements);

      if (!permissionForBcAnnouncements.granted) {
        return res.sendStatus(403);
      }
    }

    return res.json(announcement);
  }
);

/**
 * Creates a new announcement.
 *
 * @route POST /announcements
 */
announcementsRouter.post(
  '/',
  announcementPostValidation,
  authenticateJwt,
  async (
    req: Request<{}, {}, AnnouncementBody>,
    res: Response,
    next: NextFunction
  ) => {
    // Validate body
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json(validationErrors.array());
    }

    const member = req.user as RegisteredMemberInstance;

    // Check if the member can post announcements
    const permission = ac
      .can(Roles[member.role])
      .createAny(Resources.Announcements);
    if (!permission.granted) {
      return res.sendStatus(403);
    }

    // Member has permission, proceed to post the announcement
    const submittedInternalName: string | undefined = req.body.internalName;
    const announcementData = {
      // Generate internal name if none was provided
      internalName: submittedInternalName
        ? submittedInternalName
        : paramCase(req.body.title),
      title: req.body.title,
      headline: req.body.headline,
      body: req.body.body,
      role: req.body.role,
    };

    // No announcement exists with the internal name, proceed to post the announcement
    let result: AnnouncementInstance;
    try {
      result = await AnnouncementModel.create(announcementData);
    } catch (err) {
      return next(err);
    }

    // Build resulting announcement path
    const createdAnnouncementLocation = `/announcements/${result.id}/${announcementData.internalName}`;

    // Post announcement on Discord if a webhook was given
    if (process.env.DISCORD_WEBHOOK) {
      const discordContent = {
        content: `**${announcementData.title}**\n${announcementData.headline}\n\n${announcementData.body}`,
      };

      try {
        await axios.post(process.env.DISCORD_WEBHOOK, discordContent);
      } catch (err) {
        next(err);
      }
    }

    res.set('Location', createdAnnouncementLocation);
    return res.sendStatus(201);
  }
);

// Post new announcement
announcementsRouter.put(
  '/:id',
  announcementPostValidation,
  authenticateJwt,
  async (
    req: Request<IdParams, {}, AnnouncementInstance>,
    res: Response,
    next: NextFunction
  ) => {
    // Validate body
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json(validationErrors);
    }

    const member = req.user as RegisteredMemberInstance;

    // Check if the member can update announcements
    const permission = ac
      .can(Roles[member.role])
      .updateAny(Resources.Announcements);
    if (!permission.granted) {
      return res.sendStatus(403);
    }

    // Member has permission, proceed to update the announcement
    const submittedInternalName: string | undefined = req.body.internalName;
    const announcementData = {
      // Generate internal name if none was provided
      internalName: submittedInternalName
        ? submittedInternalName
        : paramCase(req.body.title),
      title: req.body.title,
      headline: req.body.headline,
      body: req.body.body,
      role: req.body.role,
    };

    try {
      await AnnouncementModel.update(announcementData, {
        where: { id: req.params.id },
      });
    } catch (err) {
      return next(err);
    }

    return res.sendStatus(200);
  }
);

// Delete announcement
announcementsRouter.delete(
  '/:id',
  authenticateJwt,
  async (req: Request<IdParams>, res: Response, next: NextFunction) => {
    const member = req.user as RegisteredMemberInstance;

    // Check if the user can delete announcements
    const permission = ac
      .can(Roles[member.role])
      .deleteAny(Resources.Announcements);
    if (!permission.granted) {
      return res.sendStatus(403);
    }

    // User has permission, proceed to delete the announcement
    // Check if announcement exists since we don't want to return 200 OK for "deleting" a nonexistent announcement
    let existingAnnouncement: AnnouncementInstance | null;
    try {
      existingAnnouncement = await AnnouncementModel.findOne({
        where: { id: req.params.id },
      });
    } catch (err) {
      return next(err);
    }

    if (existingAnnouncement === null) {
      // An announcement with the ID does not exist, cannot delete
      return res.sendStatus(404);
    }

    // Announcement exists, proceed to delete it
    try {
      await AnnouncementModel.destroy({
        where: { id: req.params.id },
      });
    } catch (err) {
      return next(err);
    }

    return res.sendStatus(200);
  }
);

/**
 * Gets the 'where' option for Sequelize based on the queried role.
 *
 *
 * @param member The member to check access.
 * @param role The role to get the 'where' option for.
 * @return All of the roles the user has access to if the user does not query a role.
 *         The specific role if the user queries a role and has access to the role.
 *        `undefined` if the user queries a role and doesn't have access to the role.
 *        `null` if the user queries a role and the role doesn't exist.
 */
const getWhereBasedOnRole = (
  member: RegisteredMemberInstance,
  role: Roles | unknown
): Roles | Record<string, unknown> | null | undefined => {
  const permissionForBcAnnouncements = ac
    .can(Roles[member.role])
    .readAny(Resources.BrooklynCollegeAnnouncements);

  if (!role) {
    if (permissionForBcAnnouncements.granted) {
      // Get all member and BC announcements
      return { [Op.or]: [Roles.Member, Roles.BrooklynCollegeMember] };
    } else {
      // Get only member announcements
      return Roles.Member;
    }
  }

  switch (role) {
    // All members
    case Roles.Member:
      return Roles.Member;

    // Brooklyn College members only
    case Roles.BrooklynCollegeMember:
      if (permissionForBcAnnouncements.granted) {
        return Roles.BrooklynCollegeMember;
      } else {
        return undefined;
      }

    // Invalid member type
    default:
      return null;
  }
};

export default announcementsRouter;
