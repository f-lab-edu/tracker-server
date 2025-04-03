import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class DashboardClient extends Model {}

DashboardClient.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    hashedPassword: { type: DataTypes.STRING, allowNull: false },
    domain: { type: DataTypes.STRING, allowNull: false },
    apiKey: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: 'dashboardClient',
    tableName: 'dashboardClients',
    timestamps: true,
  }
);

export const DashboardClientModel = DashboardClient;
