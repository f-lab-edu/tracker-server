import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class UserInfo extends Model {}

UserInfo.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: true },
    language: { type: DataTypes.STRING, allowNull: false },
    event: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    modelName: 'userInfo',
    tableName: 'userInfo',
    timestamps: true,
  }
);

export const UserInfoModel = UserInfo;
