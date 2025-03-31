import 'dotenv/config';
import { Sequelize } from 'sequelize';

const DB_PASSWORD = process.env.DB_PASSWORD as string;
const DB_NAME = process.env.DB_NAME as string;
const USER_NAME = process.env.USER_NAME as string;

const sequelize = new Sequelize(DB_NAME, USER_NAME, DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
  timezone: '+09:00',
});

export default sequelize;
