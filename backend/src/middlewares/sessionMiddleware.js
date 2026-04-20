import connectPgSimple from "connect-pg-simple";
import session from "express-session";
import pgPool from "../configs/database.js";
import ENV from "../configs/Env.js";

const pgSession = connectPgSimple(session);
// your config values
const sessionMiddleware = session({
  store: new pgSession({
    pool: pgPool,
    tableName: "session",
    createTableIfMissing: true,
    pruneSessionInterval: 60 * 15,
    ttl: 60 * 60 * 24 * 30,
  }),
  secret: ENV.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  name: ENV.COOKIE_NAME,
  rolling: true,
  unset: "destroy",
  cookie: {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 60 * 60 * 24 * 30 * 1000,
  },
});
export default sessionMiddleware;
