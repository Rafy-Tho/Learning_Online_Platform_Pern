import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import ENV from "./configs/Env.js";
import errorHandler from "./middlewares/errorHandler.js";
import { globalLimiter } from "./middlewares/rateLimitMiddlewares.js";
import sessionMiddleware from "./middlewares/sessionMiddleware.js";
import categoryRoute from "./routes/categoryRoute.js";
import chapterRoute from "./routes/chapterRoute.js";
import courseObjectiveRoute from "./routes/courseObjectiveRoute.js";
import courseRoute from "./routes/courseRoute.js";
import lessonContentRoute from "./routes/lessonContentRoute.js";
import lessonRoute from "./routes/lessonRoute.js";
import moduleRoute from "./routes/moduleRoute.js";
import userRoute from "./routes/userRoute.js";
import notFoundUrl from "./utils/notFoundUrl.js";
import reviewRoute from "./routes/reviewRoute.js";

// configure variable
const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// configure middleware express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  }),
);
app.use(morgan("dev"));
// configure middleware rate limit
app.use(globalLimiter);
// configure middleware session
app.use(sessionMiddleware);
// configure middleware static
app.use(express.static(path.join(__dirname, "../uploads")));
// configure middleware routes
app.use("/api/v1/users", userRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/courses", courseRoute);
app.use("/api/v1/objectives", courseObjectiveRoute);
app.use("/api/v1/modules", moduleRoute);
app.use("/api/v1/chapters", chapterRoute);
app.use("/api/v1/lessons", lessonRoute);
app.use("/api/v1/contents", lessonContentRoute);
app.use("/api/v1/reviews", reviewRoute);

// configure middleware handle error
app.use(notFoundUrl);
app.use(errorHandler);
// export default app;
export default app;
