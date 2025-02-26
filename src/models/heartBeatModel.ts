import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Heartbeat extends Model {}

Heartbeat.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.STRING, allowNull: false },
    firstOnlineTime: { type: DataTypes.DATE, allowNull: false },
    lastUpdateTime: { type: DataTypes.DATE, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: 'HeartBeat',
    tableName: 'HeartBeat',
    timestamps: true,
  }
);

export const heartbeatModel = Heartbeat;
