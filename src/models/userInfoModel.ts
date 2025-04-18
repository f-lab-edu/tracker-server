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
    visitDate: { type: DataTypes.DATEONLY, allowNull: false },
  },
  {
    sequelize,
    modelName: 'userInfo',
    tableName: 'userInfos',
    timestamps: true,
  }
);

export const UserInfoModel = UserInfo;
