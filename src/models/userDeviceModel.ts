import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class UserDevice extends Model {}

UserDevice.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.STRING, allowNull: false },
    browser: { type: DataTypes.STRING, allowNull: true },
    isMobile: { type: DataTypes.BOOLEAN, allowNull: false },
    os: { type: DataTypes.STRING, allowNull: false },
    resolution: { type: DataTypes.STRING, allowNull: false },
    event: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    modelName: 'userDevice',
    tableName: 'userDevice',
    timestamps: true,
  }
);

export const UserDeviceModel = UserDevice;
