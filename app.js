import dotenv from "dotenv";
// import config from "config";
import buildServer from "./server.js";
dotenv.config();
const main = async () => {
  try {
    const app = buildServer();
    const PORT = process.env.PORT || 5000;
    app.listen({ port: PORT });
    console.log(`server running port ${PORT}`);
  } catch (err) {
    console.log(err);
  }
};

main();
