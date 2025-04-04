import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class UserPageInfo extends Model {}

UserPageInfo.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.STRING, allowNull: false },
    domain: { type: DataTypes.STRING, allowNull: false },
    referrer: { type: DataTypes.STRING, allowNull: true },
    url: { type: DataTypes.STRING, allowNull: true },
    visitCount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    date: { type: DataTypes.DATEONLY, allowNull: true },
  },
  {
    sequelize,
    modelName: 'userPageInfo',
    tableName: 'userPageInfos',
    timestamps: true,
  }
);

export const UserPageInfoModel = UserPageInfo;
