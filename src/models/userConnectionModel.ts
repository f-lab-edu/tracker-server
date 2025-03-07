import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class UserConnection extends Model {}

UserConnection.init(
  {
    userId: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    domain: { type: DataTypes.STRING, allowNull: false },
    firstOnlineTime: { type: DataTypes.DATE, allowNull: false },
    lastUpdateTime: { type: DataTypes.DATE, allowNull: false },
    isOnline: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  {
    sequelize,
    modelName: 'userConnection',
    tableName: 'userConnections',
    timestamps: true,
  }
);

export const userConnectionModel = UserConnection;
