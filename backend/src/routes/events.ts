import { Request, Response, Router } from 'express';
import passport from 'passport';

import ac, { Resources, Roles } from '../security/accessControl';
import ClubEventModel, { ClubEventInstance } from '../models/ClubEvent.model';
import { UserInstance } from '../models/User.model';
import { ClubEvent, CategorizedClubEvents } from '../types';

const eventsRouter = Router();

// Get a detailed list of events
eventsRouter.get('/', async (req: Request, res: Response) => {
  const events: ClubEventInstance[] = await ClubEventModel.findAll();

  return res.json(events);
});

// Get a list of events with reduced information for the event browser
eventsRouter.get('/browser', async (req: Request, res: Response) => {
  const clubEvents: ClubEventInstance[] = await ClubEventModel.findAll({
    attributes: ['id', 'internalName', 'title', 'banner'],
    // order: 'id DESC',
  });

  const categorizedClubEvents: CategorizedClubEvents = {
    upcomingEvents: [],
    pastEvents: [],
  };

  clubEvents.forEach((event) => {
    if (event.hasEnded) {
      categorizedClubEvents.pastEvents.push(event);
    } else {
      categorizedClubEvents.upcomingEvents.push(event);
    }
  });

  return res.json(categorizedClubEvents);
});

// Get specific event by id
eventsRouter.get('/:id', async (req: Request, res: Response) => {
  const event: ClubEventInstance | null = await ClubEventModel.findOne({
    where: { id: req.params.id },
  });

  if (event === null) {
    // The event does not exist
    return res.sendStatus(404);
  }

  return res.json(event);
});

// Create new event
eventsRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req: Request<{}, {}, ClubEvent>, res: Response) => {
    // Check if the user can create club events
    // If auth was successful, then we got back a UserInstance
    const user: UserInstance = req.user as UserInstance;

    const permission = ac.can(Roles[user.role]).createAny(Resources.ClubEvents);
    if (!permission.granted) {
      console.log('Role not high enough');
      return res.sendStatus(401);
    }

    // User has permission, proceed to create the event
    const eventData: ClubEvent = req.body;

    // Check if an event with the submitted internal name already exists
    const existingEvent = await ClubEventModel.findOne({
      where: { internalName: eventData.internalName },
    });

    if (existingEvent !== null) {
      // An event with the submitted internal name already exists
      return res.sendStatus(409);
    }

    // No event exists with the internal name, proceed to create the event
    const result: ClubEventInstance = await ClubEventModel.create(eventData);

    const createdEventLocation = `/events/${result.id}/${result.internalName}`;

    res.set('Location', createdEventLocation);
    return res.sendStatus(201);
  }
);

export default eventsRouter;
