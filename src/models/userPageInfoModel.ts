import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class UserPageInfo extends Model {}

UserPageInfo.init(
  {
    userId: { type: DataTypes.STRING, allowNull: false },
    domain: { type: DataTypes.STRING, allowNull: false },
    referrer: { type: DataTypes.STRING, allowNull: true },
    url: { type: DataTypes.STRING, allowNull: true },
    visitCount: { type: DataTypes.INTEGER, allowNull: true },
    date: { type: DataTypes.DATEONLY, allowNull: true },
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
