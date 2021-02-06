import { NextFunction, Request, Response, Router } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import multer from 'multer';
import sgMail from '@sendgrid/mail';
import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import validator from 'validator';
import { body, query, validationResult } from 'express-validator';
import QueryString from 'querystring';

import RegisteredMemberModel, {
  RegisteredMemberInstance,
} from '../models/RegisteredMember.model';
import BrooklynCollegeVerificationModel, {
  BrooklynCollegeVerificationInstance,
} from '../models/BrooklynCollegeVerification.model';
import JoinedMemberModel, {
  JoinedMemberInstance,
} from '../models/JoinedMember.model';
import JoinedMemberActivationModel, {
  JoinedMemberActivationInstance,
} from '../models/JoinedMemberActivation.model';
import PasswordResetVerificationModel, {
  PasswordResetVerificationInstance,
} from '../models/PasswordResetVerification.model';

import { redisClient } from '../database';
import { Roles } from '../security/accessControl';
import authenticateJwt from '../middleware/authenticateJwt';
import { isBrooklynCollegeEmail } from '../util/isBrooklynCollegeEmail';
import { processImageAndPublicize } from '../util/googleCloudStorageUtils';
import { isEmailAvailable } from '../util/isEmailAvailable';
import {
  generateAccountActivationEmail,
  generateBrooklynCollegeVerificationEmail,
  generatePasswordResetEmail,
} from '../util/generateEmails';
import { multerImageOptions } from '../common/multerOptions';
import { memberImageOptions } from '../common/imageProcessorOptions';
import { EmailBody, FormMultipartBody, VerificationBody } from '../types';
import { isProduction } from '../app';

const SALT_ROUNDS = 10;
const MIN_PASSWORD_LENGTH = 12;
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_EXPIRATION_TIME_MS = parseInt(
  process.env.JWT_EXPIRATION_TIME_MS as string
);

const accountsRouter = Router();

const accountRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour timeout
  max: 10,
  message: 'Rate limit reached. Please try again in an hour.',
  store: new RedisStore({ client: redisClient }),
  skipSuccessfulRequests: true,
});

// Request Queries
interface AccountSettingsQuery extends QueryString.ParsedUrlQuery {
  section: string;
}

// Request Bodies
interface ProfileSettingsBody {
  firstName: string;
  lastName: string;
  memberImage?: string; // Link to member image on GCS
}

// TODO: Add account settings updating
interface AccountSettingsBody {}

// TODO: Add all settings updating
interface SettingsBody extends ProfileSettingsBody, AccountSettingsBody {}

// Validations
const emailValidation = [body('email').isEmail().normalizeEmail()];
const verificationValidation = [
  body('key').isUUID(4),
  body('password').isString().isLength({ min: MIN_PASSWORD_LENGTH }),
];
const brooklynCollegeEmailValidation = [
  body('brooklynCollegeEmail').isEmail().normalizeEmail(),
];
const brooklynCollegeKeyValidation = [body('key').isUUID()];
const updateSettingsValidation = [
  query('section').optional().isIn(['profile', 'account']),
];
const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').isString().isLength({ min: MIN_PASSWORD_LENGTH }),
];

// Multer uploads
const multerUpload = multer({
  storage: multer.diskStorage(multerImageOptions),
});

const updateSettingsUpload = multerUpload.fields([
  {
    name: 'memberImageFile',
    maxCount: 1,
  },
]);

// Routes
/**
 * Issues an activation key to a member and sends an activation email to be
 * the member's email if it exists in the joined_members database.
 *
 * @route POST /accounts/activate/request
 */
accountsRouter.post(
  '/activate/request',
  emailValidation,
  async (
    req: Request<{}, {}, EmailBody>,
    res: Response,
    next: NextFunction
  ) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json(validationErrors.array());
    }

    const submittedEmail = req.body.email;

    // Check if a member joined using the submitted email
    let joinedMember: JoinedMemberInstance | null;
    try {
      joinedMember = await JoinedMemberModel.findOne({
        where: { email: submittedEmail },
      });
    } catch (err) {
      return next(err);
    }

    if (joinedMember === null) {
      return res.sendStatus(404);
    }

    // Generate activation key and store it in the database
    const activationData = {
      memberId: joinedMember.id,
      key: uuid(),
      expiryDateTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day from initiated date,
    };

    try {
      await JoinedMemberActivationModel.create(activationData);
    } catch (err) {
      return next(err);
    }

    // Send the email with the activation key
    const activationEmail = generateAccountActivationEmail(
      joinedMember,
      activationData.key
    );

    try {
      await sgMail.send(activationEmail);
    } catch (err) {
      return next(err);
    }

    return res.sendStatus(200);
  }
);

/**
 * Registers a joined member and fully activates their account from an issued
 * activation key.
 *
 * The activation key is issued via email and can be requested from the
 * /accounts/activate/request endpoint.
 *
 * @route POST /accounts/activate
 */
accountsRouter.post(
  '/activate',
  accountRateLimiter,
  verificationValidation,
  async (
    req: Request<{}, {}, VerificationBody>,
    res: Response,
    next: NextFunction
  ) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json(validationErrors.array());
    }

    const submittedData = {
      key: req.body.key,
      password: req.body.password,
    };

    // Retrieve the data associated with the activation key, if it exists
    let retrievedData: JoinedMemberActivationInstance | null;
    try {
      retrievedData = await JoinedMemberActivationModel.findOne({
        where: { key: submittedData.key },
        include: JoinedMemberModel,
      });
    } catch (err) {
      return next(err);
    }

    // Check if key exists and hasn't expired yet
    if (
      retrievedData &&
      retrievedData.expiryDateTime > new Date(Date.now()) &&
      'joined_member' in retrievedData
    ) {
      // Key is valid, activate the account
      // Hash and salt the password and save the hash in the database
      const hashedPassword = await bcrypt.hash(
        submittedData.password,
        SALT_ROUNDS
      );

      const joinedMember: JoinedMemberInstance = retrievedData['joined_member'];
      const role = isBrooklynCollegeEmail(joinedMember.email)
        ? Roles.BrooklynCollegeMember
        : Roles.Member;

      const registeredMemberData = {
        firstName: joinedMember.firstName,
        lastName: joinedMember.lastName,
        email: joinedMember.email,
        brooklynCollegeEmail:
          role === Roles.BrooklynCollegeMember ? joinedMember.email : undefined,
        passwordHash: hashedPassword,
        role: role,
      };

      // Save the member in the database
      let registeredMember: RegisteredMemberInstance;
      try {
        // Add member to the registered members database
        registeredMember = await RegisteredMemberModel.create(
          registeredMemberData
        );

        // Remove from the joined members database
        await JoinedMemberModel.destroy({
          where: { id: joinedMember.id },
        });
      } catch (err) {
        return next(err);
      }

      // Generate JWT and send it
      const tokenExpiry = Date.now() + JWT_EXPIRATION_TIME_MS;

      const payload = {
        memberId: registeredMember.memberId,
        expires: tokenExpiry,
      };

      const token = jwt.sign(payload, JWT_SECRET);

      res.cookie('token', token, {
        maxAge: JWT_EXPIRATION_TIME_MS,
        expires: new Date(tokenExpiry),
        httpOnly: true,
        secure: true,
        domain: process.env.BACKEND_DOMAIN,
      });

      return res.sendStatus(200);
    } else {
      return res.sendStatus(401);
    }
  }
);

/**
 * Gets a member's account data to be saved in localStorage.
 *
 * @route GET /accounts/data
 */
accountsRouter.get(
  '/data',
  authenticateJwt,
  async (req: Request, res: Response) => {
    const member = req.user as RegisteredMemberInstance;

    return res.json({
      memberId: member.memberId,
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email,
      brooklynCollegeEmail: member.brooklynCollegeEmail,
      memberImage: member.memberImage,
      role: member.role,
    });
  }
);

/**
 * Gets a member's account settings for the settings page.
 *
 * @route GET /accounts/settings
 */
accountsRouter.get(
  '/settings',
  authenticateJwt,
  async (req: Request, res: Response) => {
    const member = req.user as RegisteredMemberInstance;

    if (req.query.section) {
      switch (req.query.section) {
        case 'profile':
          return res.json({
            firstName: member.firstName,
            lastName: member.lastName,
            memberImage: member.memberImage,
          });
        case 'account':
          return res.json({
            email: member.email,
            brooklynCollegeEmail: member.brooklynCollegeEmail,
          });
        default:
          return res.sendStatus(400);
      }
    } else {
      return res.json({
        firstName: member.firstName,
        lastName: member.lastName,
        memberImage: member.memberImage,
        email: member.email,
        brooklynCollegeEmail: member.brooklynCollegeEmail,
      });
    }
  }
);

/**
 * Updates a member's account settings from the settings page.
 * Currently, only the member's profile settings can be updated.
 *
 * @route PUT /accounts/settings
 */
accountsRouter.put(
  '/settings',
  authenticateJwt,
  updateSettingsValidation,
  updateSettingsUpload,
  async (
    req: Request<{}, {}, FormMultipartBody, AccountSettingsQuery>,
    res: Response,
    next: NextFunction
  ) => {
    // Validate multipart body to ensure formDataJson is proper JSON
    const validationErrors = validationResult(req);
    console.log(validationErrors);
    console.log(req.body.formDataJson);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json(validationErrors.array());
    }

    // Parse formDataJson and validate body contents based on section
    const parsedBody = JSON.parse(req.body.formDataJson);

    // Validate parsed body
    if (req.query.section) {
      switch (req.query.section) {
        // Validate profile body
        case 'profile':
          const validationErrors: string[] = [];

          // Validate fields first
          if (validator.isEmpty(parsedBody.firstName)) {
            validationErrors.push('First name cannot be blank');
          }
          if (validator.isEmpty(parsedBody.lastName)) {
            validationErrors.push('Last name cannot be blank');
          }

          if (validationErrors.length > 0) {
            res.status(400).json(validationErrors);
          }

          // Then sanitize fields
          parsedBody.firstName = validator.trim(parsedBody.firstName);
          parsedBody.lastName = validator.trim(parsedBody.lastName);

          break;

        default:
          return res.sendStatus(400);
      }
    } else {
      // TODO: Validate all settings body
    }

    // Form data is valid, proceed to update settings
    const member = req.user as RegisteredMemberInstance;

    // Upload member image to GCS if one was uploaded
    const uploadedFiles = req.files as {
      [fieldname: string]: Express.Multer.File[];
    };

    let memberImage: string | null = null;
    if (uploadedFiles['memberImageFile']) {
      const memberImageFile = uploadedFiles['memberImageFile'][0];

      try {
        memberImage = await processImageAndPublicize(
          memberImageFile,
          process.env.GCS_MEMBER_IMAGES_DIR as string,
          memberImageOptions
        );
      } catch (err) {
        return next(err);
      }
    }

    // Update database with the member's new settings
    // Selective update
    if (req.query.section) {
      let valuesToUpdate: Record<string, unknown>;

      switch (req.query.section) {
        // Profile section
        case 'profile':
          const profileBody: ProfileSettingsBody = {
            firstName: parsedBody.firstName,
            lastName: parsedBody.lastName,
          };

          if (memberImage) {
            profileBody.memberImage = memberImage;
          }

          try {
            await RegisteredMemberModel.update(profileBody, {
              where: { memberId: member.memberId },
            });
          } catch (err) {
            return next(err);
          }

          return res.sendStatus(200);

        // Account section
        case 'account':
          // This section requires additional verification
          // To change the user's email, we must send a verification email
          // to their new email

          // TODO: Add account settings updating
          return res.sendStatus(501);
        default:
          return res.sendStatus(400);
      }
    } else {
      // Update everything
      // TODO: Add everything update
      return res.sendStatus(501);
    }
  }
);

/**
 * Generates, issues a verification key, and sends an activation email
 * to a member's provided Brooklyn College email if a valid email
 * was submitted.
 *
 * @route POST /accounts/verify/bc/request
 */
accountsRouter.post(
  '/verify/bc/request',
  authenticateJwt,
  brooklynCollegeEmailValidation,
  async (req: Request, res: Response, next: NextFunction) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json(validationErrors.array());
    }

    const member = req.user as RegisteredMemberInstance;

    const submittedEmail = req.body.brooklynCollegeEmail;

    // Check if the submitted email is a Brooklyn College email
    if (!isBrooklynCollegeEmail(submittedEmail)) {
      return res
        .status(400)
        .send('The email you provided is not a Brooklyn College email.');
    }

    // Check if a member with the Brooklyn College email already exists
    try {
      if (!(await isEmailAvailable(submittedEmail))) {
        return res.sendStatus(409);
      }
    } catch (err) {
      return next(err);
    }

    // Generate verification key and store it in the database
    const verificationData = {
      memberId: member.memberId,
      brooklynCollegeEmail: submittedEmail,
      key: uuid(),
      expiryDateTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // +1 day from initiated date
    };

    try {
      await BrooklynCollegeVerificationModel.create(verificationData);
    } catch (err) {
      return next(err);
    }

    // Send the email with the verification key
    const verificationEmail = generateBrooklynCollegeVerificationEmail(
      submittedEmail,
      member,
      verificationData.key
    );

    try {
      await sgMail.send(verificationEmail);
    } catch (err) {
      return next(err);
    }

    return res.sendStatus(200);
  }
);

/**
 * Verifies a club member's Brooklyn College email by checking if an issued
 * verification key is in the key database and hasn't expired yet.
 *
 * The key is issued at the /accounts/verify/bc/request endpoint.
 *
 * @route POST /accounts/verify/bc
 */
accountsRouter.post(
  '/verify/bc',
  accountRateLimiter,
  brooklynCollegeKeyValidation,
  async (req: Request, res: Response, next: NextFunction) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json(validationErrors.array());
    }

    const submittedKey: string = req.body.key;

    // Check if the verification key exists
    let retrievedData: BrooklynCollegeVerificationInstance | null;
    try {
      retrievedData = await BrooklynCollegeVerificationModel.findOne({
        where: { key: submittedKey },
      });
    } catch (err) {
      return next(err);
    }

    // Check if a key was found and if it is still valid
    if (retrievedData && retrievedData.expiryDateTime > new Date()) {
      // Check if the email is still available
      try {
        if (!(await isEmailAvailable(retrievedData.brooklynCollegeEmail))) {
          return res.sendStatus(409);
        }
      } catch (err) {
        return next(err);
      }

      // Promote the member to Roles.BrooklynCollegeMember
      try {
        await RegisteredMemberModel.update(
          {
            role: Roles.BrooklynCollegeMember,
            brooklynCollegeEmail: retrievedData.brooklynCollegeEmail,
          },
          { where: { memberId: retrievedData.memberId } }
        );
      } catch (err) {
        return next(err);
      }

      return res.sendStatus(200);
    } else {
      return res.sendStatus(401);
    }
  }
);

/**
 * Authenticates a user via email and password and sends a JWT back if
 * the password hashes match
 *
 * @route POST /accounts/login
 */
accountsRouter.post(
  '/login',
  accountRateLimiter,
  loginValidation,
  (req: Request, res: Response) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json(validationErrors.array());
    }

    passport.authenticate(
      'local',
      { session: false },
      (err, member: RegisteredMemberInstance) => {
        if (err || !member) {
          return res.sendStatus(401);
        }

        const tokenExpiry = Date.now() + JWT_EXPIRATION_TIME_MS;

        const payload = {
          memberId: member.memberId,
          expires: tokenExpiry,
        };

        const token: string = jwt.sign(payload, JWT_SECRET);

        res.cookie('token', token, {
          maxAge: JWT_EXPIRATION_TIME_MS,
          expires: new Date(tokenExpiry),
          httpOnly: true,
        });

        return res.sendStatus(200);
      }
    )(req, res);
  }
);

/**
 * Sends a password reset email to a registered member's email.
 *
 * @route POST /accounts/resetPassword/request
 */
accountsRouter.post(
  '/resetPassword/request',
  emailValidation,
  async (
    req: Request<{}, {}, EmailBody>,
    res: Response,
    next: NextFunction
  ) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json(validationErrors.array());
    }

    const submittedEmail = req.body.email;

    // Find the member in the database
    let registeredMember: RegisteredMemberInstance | null;
    try {
      registeredMember = await RegisteredMemberModel.findOne({
        where: { email: submittedEmail },
      });
    } catch (err) {
      return next(err);
    }

    if (registeredMember === null) {
      return res.sendStatus(404);
    }

    // Generate password reset key and store in database
    const passwordResetData = {
      memberId: registeredMember.memberId,
      key: uuid(),
      expiryDateTime: new Date(Date.now() + 60 * 60 * 1000), // +1 hour from initiated date,
    };

    try {
      await PasswordResetVerificationModel.create(passwordResetData);
    } catch (err) {
      return next(err);
    }

    // Send the email with the password reset key
    const passwordResetEmail = generatePasswordResetEmail(
      registeredMember,
      passwordResetData.key
    );

    try {
      await sgMail.send(passwordResetEmail);
    } catch (err) {
      return next(err);
    }

    return res.sendStatus(200);
  }
);

/**
 * Resets a password given a valid reset key.
 * Obtain one from the /accounts/resetPassword/request endpoint.
 *
 * @route POST /accounts/resetPassword
 */
accountsRouter.post(
  '/resetPassword',
  accountRateLimiter,
  verificationValidation,
  async (
    req: Request<{}, {}, VerificationBody>,
    res: Response,
    next: NextFunction
  ) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json(validationErrors.array());
    }

    const submittedData = {
      key: req.body.key,
      password: req.body.password,
    };

    let retrievedData: PasswordResetVerificationInstance | null;
    try {
      retrievedData = await PasswordResetVerificationModel.findOne({
        where: { key: submittedData.key },
        include: RegisteredMemberModel,
      });
    } catch (err) {
      return next(err);
    }

    // Check if key exists and hasn't expired yet
    if (
      retrievedData &&
      retrievedData.expiryDateTime > new Date(Date.now()) &&
      'registered_member' in retrievedData
    ) {
      // Key is valid, reset the password
      const registeredMember: RegisteredMemberInstance =
        retrievedData['registered_member'];

      // Hash and salt the password and save the hash in the database
      const hashedPassword = await bcrypt.hash(
        submittedData.password,
        SALT_ROUNDS
      );

      try {
        await RegisteredMemberModel.update(
          { passwordHash: hashedPassword },
          { where: { memberId: registeredMember.memberId } }
        );
      } catch (err) {
        return next(err);
      }

      return res.sendStatus(200);
    } else {
      return res.sendStatus(401);
    }
  }
);

/**
 * Invalidates the JWT on the client by sending an empty cookie that expires
 * immediately.
 *
 * @route POST /accounts/logout
 */
accountsRouter.post('/logout', (req: Request, res: Response) => {
  res.cookie('token', '', {
    httpOnly: true,
    secure: isProduction,
    maxAge: 0,
    expires: new Date(),
  });

  return res.sendStatus(200);
});

/**
 * Allows members to check if they are authenticated.
 *
 * @route GET /accounts/ping
 */
accountsRouter.get(
  '/ping',
  authenticateJwt,
  async (req: Request, res: Response) => {
    // Returns only if the JWT was authenticated
    return res.sendStatus(200);
  }
);

export default accountsRouter;
