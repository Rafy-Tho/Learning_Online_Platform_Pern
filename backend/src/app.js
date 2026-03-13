import cookieParser from "cookie-parser";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import errorHandler from "./middlewares/errorHandler.js";
import { globalLimiter } from "./middlewares/rateLimitMiddlewares.js";
import sessionMiddleware from "./middlewares/sessionMiddleware.js";
import userRoute from "./routes/userRoute.js";
import notFoundUrl from "./utils/notFoundUrl.js";

// configure variable
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// configure middleware express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
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
console.log(
  "ca99ac3e3f5c92d2cb4e10484cf147826b7bcfca0f9c0a0d5bef10edb3742df1".length,
);
// export default app;
export default app;
