import { config } from "dotenv";
config();

export default {
  MONGO_DB_URI: process.env.MONGO_DB_URI_PROD,
  JWT_SECRET: process.env.JWT_SECRET,
};
