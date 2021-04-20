import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import passport from 'passport';
import cors from 'cors';
import sgMail from '@sendgrid/mail';

import './security/auth';
import { sequelize } from './database';
import eventsRouter from './routes/events';
import rootRouter from './routes/root';
import announcementsRouter from './routes/announcements';
import accountsRouter from './routes/accounts';
import joinRouter from './routes/join';

const APP_PORT = process.env.PORT || 8080;
export const UPLOADED_FILES_DEST = process.env.UPLOADED_FILES_DEST as string;
export const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  console.log('Starting server in development mode...');
}

const startServer = async () => {
  // Connect to the database before starting
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Database connection successful.');
  } catch (err) {
    // Stop the server if the database connection was unsuccessful.
    console.error('Could not connect to the database!');
    console.error(err);
    process.exit(1);
  }

  // Initialize Express
  const app = express();

  // Initialize middleware
  app.use(helmet());
  app.use(compression());
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(morgan('tiny'));
  app.use(passport.initialize());
  app.use(
    cors({
      credentials: true,
      exposedHeaders: 'Location',
    })
  );

  // Initialize routes
  app.use('/', rootRouter);
  app.use('/join', joinRouter);
  app.use('/accounts', accountsRouter);
  app.use('/events', eventsRouter);
  app.use('/announcements', announcementsRouter);

  // Initialize SendGrid
  sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

  // Start listening for requests
  app.listen(APP_PORT);
};

startServer().then(() => {
  console.log(`Server successfully started on port ${APP_PORT}.`);
});
