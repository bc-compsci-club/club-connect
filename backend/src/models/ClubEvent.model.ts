import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize } from '../database';
import { ClubEventBase } from '../types';

interface ClubEventAttributes extends ClubEventBase {
  id: number;
  presenter?: string;
  presenterImage?: string;
}

interface ClubEventCreationAttributes
  extends Optional<ClubEventAttributes, 'id'> {}

export interface ClubEventInstance
  extends Model<ClubEventAttributes, ClubEventCreationAttributes>,
    ClubEventAttributes {}

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
    defaultValue: 'https://i.imgur.com/OdgkNym.png', // Fully transparent background
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
    defaultValue: 'https://static.thenounproject.com/png/630740-200.png',
  },

  presentingMemberId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'presenting_member_id',
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

  externalLink: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'external_link',
  },

  externalLinkButtonText: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'external_link_button_text',
    defaultValue: 'Join Event',
  },
});

export default ClubEventModel;
