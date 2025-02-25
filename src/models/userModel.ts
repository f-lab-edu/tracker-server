import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class UserInfo extends Model {}

UserInfo.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    page: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.STRING, allowNull: false },
    userPrevPage: { type: DataTypes.STRING, allowNull: true },
    userAccessTime: { type: DataTypes.DATE, allowNull: false },
    userBrowser: { type: DataTypes.STRING, allowNull: false },
    userOs: { type: DataTypes.STRING, allowNull: false },
    userCountry: { type: DataTypes.STRING, allowNull: true },
    userIsMobile: { type: DataTypes.BOOLEAN, allowNull: false },
    userResolution: { type: DataTypes.STRING, allowNull: false },
    userLanguage: { type: DataTypes.STRING, allowNull: false },
    event: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    modelName: 'UserInfo',
    tableName: 'UserInfo',
    timestamps: true,
  }
);

export const UserInfoModel = UserInfo;
