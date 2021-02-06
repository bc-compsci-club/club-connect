import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize } from '../database';
import { MemberData } from '../types';

interface RegisteredMemberAttributes extends MemberData {
  passwordHash: string;
}

interface RegisteredMemberCreationAttributes
  extends Optional<RegisteredMemberAttributes, 'memberId'> {}

export interface RegisteredMemberInstance
  extends Model<RegisteredMemberAttributes, RegisteredMemberCreationAttributes>,
    RegisteredMemberAttributes {}

/**
 * Represents a fully registered club member that joined the club
 * on the join page and activated their account by verifying their
 * email and setting a password.
 *
 * Database conventions based off of a sample database provided by MySQL
 * https://dev.mysql.com/doc/employee/en/
 */
const RegisteredMemberModel = sequelize.define<RegisteredMemberInstance>(
  'registered_members',
  {
    memberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'member_id',
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

    brooklynCollegeEmail: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'brooklyn_college_email',
      unique: true,
    },

    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'password_hash',
    },

    memberImage: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'member_image',
    },

    role: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'role',
    },
  }
);

export default RegisteredMemberModel;
