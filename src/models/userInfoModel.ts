import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class UserInfo extends Model {}

UserInfo.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.STRING, allowNull: false },
    domain: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
    language: { type: DataTypes.STRING, allowNull: false },
    visitedCount: { type: DataTypes.NUMBER, allowNull: false, defaultValue: 1 },
  },
  {
    sequelize,
    modelName: 'userInfo',
    tableName: 'userInfo',
    timestamps: true,
  }
);

export const UserInfoModel = UserInfo;
