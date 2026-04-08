import express from "express";
import requireAuth from "../middlewares/requireAuth.js";
import {
  getLearningProgress,
  learningProgress,
  updateLearningProgress,
} from "../controllers/learningProgressControllers.js";
import { validateResult } from "../middlewares/validateResult.js";
import { learningProgressValidator } from "../validators/courseValidators.js";

const learningProgressRoute = express.Router({ mergeParams: true });

learningProgressRoute
  .route("/")
  .post(requireAuth, learningProgress)
  .get(requireAuth, getLearningProgress)
  .patch(
    requireAuth,
    learningProgressValidator,
    validateResult,
    updateLearningProgress,
  );

export default learningProgressRoute;
