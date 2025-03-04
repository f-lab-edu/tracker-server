import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class UserPageInfo extends Model {}

UserPageInfo.init(
  {
    userId: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    domain: { type: DataTypes.STRING, allowNull: false },
    referrer: { type: DataTypes.STRING, allowNull: true },
    url: { type: DataTypes.STRING, allowNull: false },
    loadTime: { type: DataTypes.FLOAT, allowNull: true },
    visitCount: { type: DataTypes.INTEGER, allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
  },
  {
    sequelize,
    modelName: 'userPageInfo',
    tableName: 'userPageInfos',
    timestamps: true,
  }
);

export const UserPageInfoModel = UserPageInfo;
