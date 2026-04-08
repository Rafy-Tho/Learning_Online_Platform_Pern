import express from "express";
import {
  createLearningProgress,
  getLearningProgress,
  updateLearningProgress,
} from "../controllers/learningProgressControllers.js";
import requireAuth from "../middlewares/requireAuth.js";
import { validateResult } from "../middlewares/validateResult.js";
import { learningProgressValidator } from "../validators/courseValidators.js";

const learningProgressRoute = express.Router({ mergeParams: true });

learningProgressRoute
  .route("/")
  .post(requireAuth, createLearningProgress)
  .get(requireAuth, getLearningProgress)
  .patch(
    requireAuth,
    learningProgressValidator,
    validateResult,
    updateLearningProgress,
  );

export default learningProgressRoute;
