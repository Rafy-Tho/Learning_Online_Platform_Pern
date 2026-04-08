import express from "express";
import {
  createLessonCompletion,
  getLessonCompletion,
} from "../controllers/lessonCompletionControllers.js";
import requireAuth from "../middlewares/requireAuth.js";
const lessonCompletionRoute = express.Router({ mergeParams: true });

lessonCompletionRoute
  .route("/")
  .post(requireAuth, createLessonCompletion)
  .get(requireAuth, getLessonCompletion);
export default lessonCompletionRoute;
