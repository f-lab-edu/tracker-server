import 'dotenv/config';
import { Sequelize } from 'sequelize';

const dbPassword = process.env.DB_PASSWORD;
const DB_NAME = 'tracker';
const USER_NAME = 'nemo0824';

const sequelize = new Sequelize(DB_NAME, USER_NAME, dbPassword, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

export default sequelize;
