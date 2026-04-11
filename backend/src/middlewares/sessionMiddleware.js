import connectPgSimple from 'connect-pg-simple';
import session from 'express-session';
import pgPool from '../configs/database.js';
import ENV from '../configs/Env.js';
import {
  COOKIE_MAX_AGE_MSEC,
  SESSION_INTERVAL_SEC,
  SESSION_MAX_AGE_SEC,
} from '../constants/constants.js';
const pgSession = connectPgSimple(session);
// your config values
const sessionMiddleware = session({
  store: new pgSession({
    pool: pgPool,
    tableName: 'session',
    createTableIfMissing: true,
    pruneSessionInterval: SESSION_INTERVAL_SEC,
    ttl: SESSION_MAX_AGE_SEC,
  }),
  secret: ENV.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  name: ENV.COOKIE_NAME,
  rolling: true,
  unset: 'destroy',
  cookie: {
    secure: ENV.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: COOKIE_MAX_AGE_MSEC,
    sameSite: ENV.NODE_ENV === 'production' ? 'none' : 'lax',
  },
});
export default sessionMiddleware;
