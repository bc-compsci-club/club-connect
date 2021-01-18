import { Options, Sequelize } from 'sequelize';

// Check DB environment variables and stop the server if they don't exist
if (
  !(
    process.env.DB_DIALECT &&
    process.env.DB_USERNAME &&
    process.env.DB_PASSWORD &&
    process.env.DB_DATABASE &&
    process.env.DB_HOST &&
    process.env.DB_PORT
  )
) {
  console.error(
    'Database environment variables not set! Please set them and restart the server.'
  );
  process.exit(1);
}

const sequelize = new Sequelize({
  dialect: process.env.DB_DIALECT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT.toString()),
} as Options);

export default sequelize;
