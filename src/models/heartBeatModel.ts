import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Heartbeat extends Model {}

Heartbeat.init(
  {
    userId: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    domain: { type: DataTypes.STRING, allowNull: false },
    firstOnlineTime: { type: DataTypes.DATE, allowNull: false },
    lastUpdateTime: { type: DataTypes.DATE, allowNull: false },
    isOnline: { type: DataTypes.BOOLEAN, allowNull: false },
  },
  {
    sequelize,
    modelName: 'heartbeat',
    tableName: 'heartbeats',
    timestamps: true,
  }
);

export const heartbeatModel = Heartbeat;
