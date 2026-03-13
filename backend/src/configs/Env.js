import dotenv from "dotenv";

dotenv.config();

const ENV = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  // database
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  // session
  SESSION_SECRET: process.env.SESSION_SECRET,
  COOKIE_NAME: process.env.COOKIE_NAME,
  // url
  CLIENT_URL: process.env.CLIENT_URL,
  BASE_URL: process.env.BASE_URL,
  // mail
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  EMAIL_SENDER: process.env.EMAIL_SENDER,
  EMAIL_SENDER_CODE: process.env.EMAIL_SENDER_CODE,
};

export default ENV;
