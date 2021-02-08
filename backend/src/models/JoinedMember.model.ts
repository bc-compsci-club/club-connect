import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize } from '../database';

interface JoinedMemberAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  joinDate: Date;
}

interface JoinedMemberCreationAttributes
  extends Optional<JoinedMemberAttributes, 'id'> {}

export interface JoinedMemberInstance
  extends Model<JoinedMemberAttributes, JoinedMemberCreationAttributes>,
    JoinedMemberAttributes {}

// Database conventions based off of a sample database provided by MySQL
// https://dev.mysql.com/doc/employee/en/
const JoinedMemberModel = sequelize.define<JoinedMemberInstance>(
  'joined_members',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'id',
      autoIncrement: true,
      primaryKey: true,
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'first_name',
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'last_name',
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'email',
      unique: true,
    },

    joinDate: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'join_date',
    },
  }
);

export default JoinedMemberModel;
