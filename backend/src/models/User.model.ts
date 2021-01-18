import { Model, DataTypes } from 'sequelize';

import sequelize from '../sequelizeInstance';
import { User } from '../types';

interface UserAttributes extends User {
  userNumber: number;
}

export interface UserInstance extends Model<UserAttributes, {}>, UserAttributes {}

// Database conventions based off of a sample database provided by MySQL
// https://dev.mysql.com/doc/employee/en/
const UserModel = sequelize.define<UserInstance>('users', {
  userNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_number',
    autoIncrement: true,
    primaryKey: true,
  },

  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'user_id',
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
  },

  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'password_hash',
  },

  role: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'role',
  },
});

export default UserModel;
