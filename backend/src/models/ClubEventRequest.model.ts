import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize } from '../database';
import { ClubEventBase } from '../types';
import { RequestStatuses } from '../enums';

// Similar to ClubEvent, but all event fields are required and there is no full ID created yet
interface ClubEventRequestAttributes extends ClubEventBase {
  requestNumber: number;
  requestStatus: RequestStatuses;
  internalName: string;
  title: string;
  banner: string;
  presentingMemberId: number;
  startDateTime: Date;
  endDateTime: Date;
  eventLocation: string;
  shortDescription: string;
  longDescription: string;
  externalLink: string;
  externalLinkButtonText: string;
}

interface ClubEventRequestCreationAttributes
  extends Optional<ClubEventRequestAttributes, 'requestNumber'> {}

export interface ClubEventRequestInstance
  extends Model<ClubEventRequestAttributes, ClubEventRequestCreationAttributes>,
    ClubEventRequestAttributes {}

// Database conventions based off of a sample database provided by MySQL
// https://dev.mysql.com/doc/employee/en/
const ClubEventRequestModel = sequelize.define<ClubEventRequestInstance>(
  'club_event_requests',
  {
    requestNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'request_number',
      autoIncrement: true,
      primaryKey: true,
    },

    requestStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'request_status',
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
      allowNull: false,
      field: 'banner',
      defaultValue: 'https://i.imgur.com/OdgkNym.png', // Fully transparent background
    },

    // Refers to `memberID` on `members` table
    presentingMemberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'presenting_member_id',
    },

    startDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'start_date_time',
    },

    endDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'end_date_time',
    },

    eventLocation: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'event_location',
    },

    shortDescription: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'short_description',
    },

    longDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'long_description',
    },

    externalLink: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'external_link',
    },

    externalLinkButtonText: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'external_link_button_text',
    },
  }
);

// ClubEventRequestModel.hasMany(RegisteredMemberModel, {
//   foreignKey: 'memberId',
//   sourceKey: 'presentingMemberId',
// });

export default ClubEventRequestModel;
