import '../models';
import sequelize from './db';
const DbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('연결성공');
    await sequelize.sync({ alter: true });
    console.log('테이블 생성 완료');
  } catch (err) {
    console.error('연결실패', err);
  }
};

DbConnection();
