import cors from "cors";
import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import connectCloudinary from "./configs/cloudinary.js";
import ENV from "./configs/Env.js";
import errorHandler from "./middlewares/errorHandler.js";
import { globalLimiter } from "./middlewares/rateLimitMiddlewares.js";
import sessionMiddleware from "./middlewares/sessionMiddleware.js";
import answerRoute from "./routes/answerRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import chapterRoute from "./routes/chapterRoute.js";
import courseObjectiveRoute from "./routes/courseObjectiveRoute.js";
import courseRoute from "./routes/courseRoute.js";
import enrollmentRoute from "./routes/enrollmentRoute.js";
import learningProgressRoute from "./routes/learningProgressRoute.js";
import lessonCompletionRoute from "./routes/lessonCompletionRoute.js";
import lessonContentRoute from "./routes/lessonContentRoute.js";
import lessonRoute from "./routes/lessonRoute.js";
import moduleRoute from "./routes/moduleRoute.js";
import questionRoute from "./routes/questionRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import subscriptionRoute from "./routes/subscriptionRoute.js";
import userRoute from "./routes/userRoute.js";
import webhookRoute from "./routes/webhookRoute.js";
import notFoundUrl from "./utils/notFoundUrl.js";

const app = express();

// 1. Trust proxy (required for secure cookies behind Nginx/ALB/etc.)
app.set("trust proxy", 1);

// 2. CORS before everything
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));

// 3. Webhook route (needs raw body, so before json parser)
app.use("/api/v1/stripe-webhook", webhookRoute);

// 4. Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 5. No cookieParser needed — session handles it
app.use(morgan("dev"));
app.use(globalLimiter);
app.use(sessionMiddleware);
connectCloudinary();
// 6. Static + routes
const __dirname = path.dirname(fileURLToPath(import.meta.url));
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
app.use("/api/v1/questions", questionRoute);
app.use("/api/v1/answers", answerRoute);
app.use("/api/v1/enrollments", enrollmentRoute);
app.use("/api/v1/progresses", learningProgressRoute);
app.use("/api/v1/completions", lessonCompletionRoute);
app.use("/api/v1/subscriptions", subscriptionRoute);
// configure middleware handle error
app.use(notFoundUrl);
app.use(errorHandler);
// export default app;
export default app;
