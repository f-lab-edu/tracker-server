import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class APIKeyModel extends Model {}

APIKeyModel.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    api_key: { type: DataTypes.STRING, allowNull: false, unique: true },
    domain: { type: DataTypes.STRING, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  {
    sequelize,
    modelName: 'apiKeys',
    tableName: 'apiKeys',
    timestamps: true,
  }
);
export const apiKeyModel = APIKeyModel;
