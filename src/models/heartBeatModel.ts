import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class HeartBeat extends Model {}

HeartBeat.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.STRING, allowNull: false },
    page: { type: DataTypes.STRING, allowNull: false },
    timestamps: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    event: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: 'HeartBeat',
    tableName: 'HeartBeat',
    timestamps: true,
  }
);

export const HeartBeatModel = HeartBeat;
