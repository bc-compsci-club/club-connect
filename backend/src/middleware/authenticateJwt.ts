import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

/**
 * Express middleware to authenticate a user's JWT and send 401 Unauthorized if invalid
 * https://github.com/mikenicholson/passport-jwt/issues/157#issuecomment-502713019
 *
 * @param req The Express request.
 * @param res The Express response.
 * @param next The Express next function.
 */
const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) return next(err);
    if (!user) return res.sendStatus(401);
    req.user = user;
    next();
  })(req, res, next);
};

export default authenticateJwt;
