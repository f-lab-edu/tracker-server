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
    lastHeartbeatTime: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    modelName: 'userConnection',
    tableName: 'userConnections',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['userId', 'domain'],
      },
    ],
  }
);

export const userConnectionModel = UserConnection;
