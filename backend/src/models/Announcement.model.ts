import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize } from '../database';
import { Roles } from '../security/accessControl';

interface AnnouncementAttributes {
  id: number;
  internalName: string;
  title: string;
  headline: string;
  body: string;
  role: Roles;
}

interface AnnouncementCreationAttributes
  extends Optional<AnnouncementAttributes, 'id'> {}

export interface AnnouncementInstance
  extends Model<AnnouncementAttributes, AnnouncementCreationAttributes>,
    AnnouncementAttributes {}

/**
 * Represents a posted club announcement.
 *
 * Database conventions based off of a sample database provided by MySQL
 * https://dev.mysql.com/doc/employee/en/
 */
const AnnouncementModel = sequelize.define<AnnouncementInstance>(
  'announcements',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'id',
      autoIncrement: true,
      primaryKey: true,
    },

    internalName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'internal_name',
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'title',
    },

    headline: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'headline',
    },

    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'body',
    },

    role: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'role',
    },
  }
);

export default AnnouncementModel;
