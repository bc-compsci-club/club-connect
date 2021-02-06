import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize } from '../database';
import { VerificationBase } from '../types';

interface BrooklynCollegeVerificationAttributes extends VerificationBase {
  verificationNumber: number;
  brooklynCollegeEmail: string;
}

interface BrooklynCollegeVerificationCreationAttributes
  extends Optional<
    BrooklynCollegeVerificationAttributes,
    'verificationNumber'
  > {}

export interface BrooklynCollegeVerificationInstance
  extends Model<
      BrooklynCollegeVerificationAttributes,
      BrooklynCollegeVerificationCreationAttributes
    >,
    BrooklynCollegeVerificationAttributes {}

// Database conventions based off of a sample database provided by MySQL
// https://dev.mysql.com/doc/employee/en/
const BrooklynCollegeVerificationModel = sequelize.define<BrooklynCollegeVerificationInstance>(
  'brooklyn_college_verifications',
  {
    verificationNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'verification_number',
      autoIncrement: true,
      primaryKey: true,
    },

    memberId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'member_id',
    },

    brooklynCollegeEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'brooklyn_college_email',
    },

    key: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'key',
    },

    expiryDateTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'expiry_date_time',
    },
  }
);

export default BrooklynCollegeVerificationModel;
