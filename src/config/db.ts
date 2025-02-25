import { Sequelize } from 'sequelize';

const DB_NAME = 'tracker';
const USER_NAME = 'nemo0824';

const sequelize = new Sequelize(DB_NAME, USER_NAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

export default sequelize;
