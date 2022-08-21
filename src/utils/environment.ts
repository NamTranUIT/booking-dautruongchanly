import dotenv from "dotenv";

dotenv.config();

export default {
  SERVER_PORT: process.env.SERVER_PORT,
  MONGO_URI: process.env.MONGO_URI,
  LOG_LEVEL: process.env.LOG_LEVEL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  SECRET_KEY: process.env.SECRET_KEY,
};
