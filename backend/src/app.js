import connectPgSimple from "connect-pg-simple";
import cookieParser from "cookie-parser";
import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import pgPool from "./configs/database.js";
import ENV from "./configs/Env.js";
import {
  COOKIE_MAX_AGE_MSEC,
  SESSION_INTERVAL_SEC,
  SESSION_MAX_AGE_SEC,
} from "./constants/constants.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFoundUrl from "./utils/notFoundUrl.js";
import userRoute from "./routes/userRoute.js";

// configure variable
const app = express();
const pgSession = connectPgSimple(session);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// configure middleware express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// configure middleware session
app.use(
  session({
    store: new pgSession({
      pool: pgPool,
      tableName: "session",
      createTableIfMissing: true,
      pruneSessionInterval: SESSION_INTERVAL_SEC,
      ttl: SESSION_MAX_AGE_SEC,
    }),
    secret: ENV.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: ENV.COOKIE_NAME,
    rolling: true,
    unset: "destroy",
    cookie: {
      secure: ENV.NODE_ENV === "production",
      httpOnly: true,
      maxAge: COOKIE_MAX_AGE_MSEC,
    },
  }),
);
// configure middleware static
app.use(express.static(path.join(__dirname, "../uploads")));
// configure middleware routes
app.use("/api/users", userRoute);
// configure middleware handle error
app.use(notFoundUrl);
app.use(errorHandler);
// export default app;
export default app;
