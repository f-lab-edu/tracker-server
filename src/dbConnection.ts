import sequelize from "./db";

const DbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("연결성공");
  } catch (err) {
    console.error("연결실패", err);
  }
};

DbConnection();
