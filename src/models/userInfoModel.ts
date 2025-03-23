import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class UserInfo extends Model {}

UserInfo.init(
  {
    userId: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    domain: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: false },
    language: { type: DataTypes.STRING, allowNull: false },
    visitedCount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  },
  {
    sequelize,
    modelName: 'userInfo',
    tableName: 'userInfos',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['userId', 'domain'],
      },
    ],
  }
);

export const UserInfoModel = UserInfo;
