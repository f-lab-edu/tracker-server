import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class UserDevice extends Model {}

UserDevice.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.STRING, allowNull: false },
    domain: { type: DataTypes.STRING, allowNull: false },
    browser: { type: DataTypes.STRING, allowNull: true },
    isMobile: { type: DataTypes.BOOLEAN, allowNull: false },
    os: { type: DataTypes.STRING, allowNull: false },
    resolution: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: 'userDevice',
    tableName: 'userDevices',
    timestamps: true,
  }
);

export const UserDeviceModel = UserDevice;
