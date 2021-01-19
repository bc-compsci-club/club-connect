import { Model, DataTypes } from 'sequelize';

import sequelize from '../sequelizeInstance';
import { ClubEvent } from '../types';

// No additional attributes needed

export interface ClubEventInstance extends Model<ClubEvent, {}>, ClubEvent {}

// Database conventions based off of a sample database provided by MySQL
// https://dev.mysql.com/doc/employee/en/
const ClubEventModel = sequelize.define<ClubEventInstance>('club_events', {
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

  banner: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'banner',
  },

  presenter: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'presenter',
  },

  presenterImage: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'presenter_image',
  },

  startDateTime: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'start_date_time',
  },

  endDateTime: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'end_date_time',
  },

  eventLocation: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'event_location',
  },

  shortDescription: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'short_description',
  },

  longDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'long_description',
  },

  meetingLink: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'meeting_link',
  },

  buttonText: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'button_text',
  },

  hasEnded: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    field: 'has_ended',
    defaultValue: false,
  },
});

export default ClubEventModel;
