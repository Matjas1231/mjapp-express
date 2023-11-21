import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';

interface UserAttributes {
  username: string;
  email: string;
}

export class User extends Model<UserAttributes> {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: db,
    modelName: 'User',
    tableName: 'Users'
  }
);
