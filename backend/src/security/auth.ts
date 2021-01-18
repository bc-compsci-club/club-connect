import passport from 'passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';
import bcrypt from 'bcrypt';

import UserModel, { UserInstance } from '../models/User.model';

const localStrategy = passportLocal.Strategy;
const jwtStrategy = passportJwt.Strategy;
const extractJwt = passportJwt.ExtractJwt;

// Email and password auth
passport.use(
  new localStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      // Find the user in the database
      const foundUser: UserInstance | null = await UserModel.findOne({
        where: {
          email: email,
        },
      });

      // Check if the account exists
      if (foundUser === null) {
        return done(null, false);
      }

      // Try to authenticate user
      const isPasswordCorrect: boolean = await bcrypt.compare(
        password,
        foundUser.passwordHash
      );

      if (isPasswordCorrect) {
        return done(null, foundUser);
      } else {
        return done(null, false);
      }
    }
  )
);

// JWT auth
passport.use(
  new jwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: extractJwt.fromHeader('token'),
    },
    async (payload, done) => {
      if (Date.now() > payload.expires) {
        return done('JWT expired!');
      }

      const foundUser: UserInstance | null = await UserModel.findOne({
        where: { userId: payload.userId },
      });

      if (foundUser) {
        return done(null, foundUser);
      } else {
        return done(null, false);
      }
    }
  )
);
