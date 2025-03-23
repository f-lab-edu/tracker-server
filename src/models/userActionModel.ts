import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class UserAction extends Model {
  public userId!: string;
  public domain!: string;
  public url!: string;
  public scrollDepth!: number | null;
  public isBounced!: boolean;
}

UserAction.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.STRING, allowNull: false },
    domain: { type: DataTypes.STRING, allowNull: false },
    url: { type: DataTypes.STRING, allowNull: false },
    scrollDepth: { type: DataTypes.INTEGER, allowNull: true, defaultValue: null },
    isBounced: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  },
  {
    sequelize,
    modelName: 'userAction',
    tableName: 'userActions',
    timestamps: false,
  }
);

export const UserActionModel = UserAction;
