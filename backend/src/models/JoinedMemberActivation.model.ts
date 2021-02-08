import { DataTypes, Model, Optional } from 'sequelize';

import JoinedMemberModel from './JoinedMember.model';
import { sequelize } from '../database';
import { VerificationBase } from '../types';

interface JoinedMemberActivationAttributes extends VerificationBase {
  activationNumber: number;
}

interface JoinedMemberActivationCreationAttributes
  extends Optional<JoinedMemberActivationAttributes, 'activationNumber'> {}

export interface JoinedMemberActivationInstance
  extends Model<
      JoinedMemberActivationAttributes,
      JoinedMemberActivationCreationAttributes
    >,
    JoinedMemberActivationAttributes {}

/**
 * Stores the activation keys for a club member's joining email.
 *
 * Database conventions based off of a sample database provided by MySQL
 * https://dev.mysql.com/doc/employee/en/
 */
const JoinedMemberActivationModel = sequelize.define<JoinedMemberActivationInstance>(
  'joined_member_activations',
  {
    activationNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'activation_number',
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
    },

    expiryDateTime: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'expiry_date_time',
    },
  }
);

JoinedMemberModel.hasOne(JoinedMemberActivationModel, {
  sourceKey: 'id',
});

JoinedMemberActivationModel.belongsTo(JoinedMemberModel, {
  foreignKey: 'memberId',
});

export default JoinedMemberActivationModel;
