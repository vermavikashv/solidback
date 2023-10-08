import database from "mongoose";

const dataBaseConnection = async () => {
  try {
    await database.connect(process.env.DB_URI);
    console.log(" database connect successfully");
  } catch (err) {
    console.log("error", err);
  }
};
export default dataBaseConnection;
