import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class UserPageInfo extends Model {}

UserPageInfo.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.STRING, allowNull: false },
    domain: { type: DataTypes.STRING, allowNull: false },
    referrer: { type: DataTypes.STRING, allowNull: true },
    url: { type: DataTypes.STRING, allowNull: false },
    loadTime: { type: DataTypes.FLOAT, allowNull: true },
    visitCount: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: 'userPageInfo',
    tableName: 'userPageInfo',
    timestamps: true,
  }
);

export const UserPageInfoModel = UserPageInfo;
