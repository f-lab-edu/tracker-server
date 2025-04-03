import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class UserPageInfo extends Model {}

UserPageInfo.init(
  {
    userId: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    domain: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    referrer: { type: DataTypes.STRING, allowNull: true },
    url: { type: DataTypes.STRING, allowNull: true, primaryKey: true },
    visitCount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    date: { type: DataTypes.DATEONLY, allowNull: true, primaryKey: true },
  },
  {
    sequelize,
    modelName: 'userPageInfo',
    tableName: 'userPageInfos',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['userId', 'domain', 'url', 'date'],
      },
    ],
  }
);

export const UserPageInfoModel = UserPageInfo;
