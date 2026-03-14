import cookieParser from "cookie-parser";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import errorHandler from "./middlewares/errorHandler.js";
import { globalLimiter } from "./middlewares/rateLimitMiddlewares.js";
import sessionMiddleware from "./middlewares/sessionMiddleware.js";
import userRoute from "./routes/userRoute.js";
import notFoundUrl from "./utils/notFoundUrl.js";
import morgan from "morgan";

// configure variable
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// configure middleware express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
// configure middleware rate limit
app.use(globalLimiter);
// configure middleware session
app.use(sessionMiddleware);
// configure middleware static
app.use(express.static(path.join(__dirname, "../uploads")));
// configure middleware routes
app.use("/api/v1/users", userRoute);
// configure middleware handle error
app.use(notFoundUrl);
app.use(errorHandler);
// export default app;
export default app;
