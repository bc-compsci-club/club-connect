import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

import JoinedMemberModel from '../models/JoinedMember.model';
import { isEmailAvailable } from '../util/isEmailAvailable';
import { JoiningMember } from '../types';

const joinRouter = Router();

// Validators
const joinValidation = [
  body('firstName').notEmpty().trim(),
  body('lastName').notEmpty().trim(),
  body('email').isEmail().normalizeEmail(),
];

/**
 * Registers a new member for the club as joined.
 *
 * @route POST /join
 */
joinRouter.post(
  '/',
  joinValidation,
  async (
    req: Request<{}, {}, JoiningMember>,
    res: Response,
    next: NextFunction
  ) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json(validationErrors.array());
    }

    // Check if email is already in use
    try {
      if (!(await isEmailAvailable(req.body.email))) {
        return res.sendStatus(409);
      }
    } catch (err) {
      return next(err);
    }

    // Save the member in the database as joined
    const memberData = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      joinDate: new Date(),
    };

    try {
      await JoinedMemberModel.create(memberData);
    } catch (err) {
      return next(err);
    }

    return res.sendStatus(200);
  }
);

export default joinRouter;
