import { DataTypes, Model, Optional } from 'sequelize';

import { sequelize } from '../database';
import { VerificationBase } from '../types';
import RegisteredMemberModel from './RegisteredMember.model';

interface PasswordResetVerificationAttributes extends VerificationBase {
  verificationNumber: number;
}

interface PasswordResetVerificationCreationAttributes
  extends Optional<PasswordResetVerificationAttributes, 'verificationNumber'> {}

export interface PasswordResetVerificationInstance
  extends Model<
      PasswordResetVerificationAttributes,
      PasswordResetVerificationCreationAttributes
    >,
    PasswordResetVerificationAttributes {}

// Database conventions based off of a sample database provided by MySQL
// https://dev.mysql.com/doc/employee/en/
const PasswordResetVerificationModel = sequelize.define<PasswordResetVerificationInstance>(
  'password_reset_verifications',
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

    key: {
      type: DataTypes.UUID,
      allowNull: false,
      field: 'key',
      unique: true,
    },

    expiryDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'expiry_date_time',
    },
  }
);

RegisteredMemberModel.hasMany(PasswordResetVerificationModel, {
  sourceKey: 'memberId',
});

PasswordResetVerificationModel.belongsTo(RegisteredMemberModel, {
  foreignKey: 'memberId',
});

export default PasswordResetVerificationModel;
