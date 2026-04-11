import dotenv from 'dotenv';

dotenv.config();

const ENV = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  // database
  DATABASE_URL: process.env.DATABASE_URL,
  // session
  SESSION_SECRET: process.env.SESSION_SECRET,
  COOKIE_NAME: process.env.COOKIE_NAME,
  // url
  CLIENT_URL: process.env.CLIENT_URL,
  // mail
  MAIL_HOST: process.env.MAIL_HOST,
  MAIL_PORT: process.env.MAIL_PORT,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
  EMAIL_SENDER: process.env.EMAIL_SENDER,
  EMAIL_SENDER_CODE: process.env.EMAIL_SENDER_CODE,
  // Stripe api key
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  // cloudinary
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET_KEY: process.env.CLOUDINARY_SECRET_KEY,
};

export default ENV;
