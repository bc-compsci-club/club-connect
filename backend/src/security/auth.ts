import passport from 'passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';
import bcrypt from 'bcrypt';

import RegisteredMemberModel, {
  RegisteredMemberInstance,
} from '../models/RegisteredMember.model';

const localStrategy = passportLocal.Strategy;
const jwtStrategy = passportJwt.Strategy;

// Email and password auth
passport.use(
  new localStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
      // Find the user in the database
      const foundMember: RegisteredMemberInstance | null = await RegisteredMemberModel.findOne(
        {
          where: {
            email: email,
          },
        }
      );

      // Check if the account exists
      if (foundMember === null) {
        return done(null, false);
      }

      // Try to authenticate user
      const isPasswordCorrect: boolean = await bcrypt.compare(
        password,
        foundMember.passwordHash
      );

      if (isPasswordCorrect) {
        return done(null, foundMember);
      } else {
        return done(null, false);
      }
    }
  )
);

// req.cookies is populated from cookie-parser
const cookieExtractor = (req: { cookies: { token: string } }) => {
  if (req && req.cookies) {
    return req.cookies.token;
  } else {
    return null;
  }
};

// JWT auth
passport.use(
  new jwtStrategy(
    {
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: cookieExtractor,
    },
    async (payload, done) => {
      if (Date.now() > payload.expires) {
        return done(null, false);
      }

      const foundMember: RegisteredMemberInstance | null = await RegisteredMemberModel.findOne(
        {
          where: { memberId: payload.memberId },
        }
      );

      if (foundMember) {
        return done(null, foundMember);
      } else {
        return done(null, false);
      }
    }
  )
);
