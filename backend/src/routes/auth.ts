import { Request, Response, Router } from 'express';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import UserModel, { UserInstance } from '../models/User.model';
import { LoggingInUser, RegisteringUser } from '../types';
import { Roles } from '../security/accessControl';

const SALT_ROUNDS = 10;
const JWT_EXPIRATION_TIME_MS: number = parseInt(
  process.env.JWT_EXPIRATION_TIME_MS as string
);
const JWT_SECRET: string = process.env.JWT_SECRET as string;

const authRouter = Router();

authRouter.post(
  '/login',
  (req: Request<{}, {}, LoggingInUser>, res: Response, next) => {
    console.log('Logging in user');
    console.log(req.body);

    passport.authenticate(
      'local',
      { session: false },
      (err, user: UserInstance) => {
        console.log(user);

        if (err || !user) {
          console.log('Bad credentials');
          res.sendStatus(400);
          return next();
        }

        console.log('Login successful');

        const payload = {
          userId: user.userId,
          expires: Date.now() + JWT_EXPIRATION_TIME_MS,
        };

        console.log(payload);

        const token: string = jwt.sign(payload, JWT_SECRET);

        // Generate JWT
        res.json({ token: token });
        return next();
      }
    )(req, res, next);
  }
);

authRouter.post(
  '/register',
  async (req: Request<{}, {}, RegisteringUser>, res: Response, next) => {
    const registeringUser: RegisteringUser = req.body;

    console.log('Registering user');

    // Check if the account already exists
    const foundUser = await UserModel.findOne({
      where: {
        email: registeringUser.email,
      },
    });

    // Resolve with 409 if an account exists with the provided email
    if (foundUser !== null) {
      res.sendStatus(409);
      return next();
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(
      registeringUser.password,
      SALT_ROUNDS
    );

    // Save the user in the database
    await UserModel.create({
      userId: uuid(), // Generate a random UUID for the user
      firstName: registeringUser.firstName,
      lastName: registeringUser.lastName,
      email: registeringUser.email,
      passwordHash: hashedPassword,
      role: Roles.Member
    });

    res.sendStatus(200);
    return next();
  }
);

export default authRouter;
