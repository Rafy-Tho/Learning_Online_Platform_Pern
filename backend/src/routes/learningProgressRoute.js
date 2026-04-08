import express from "express";
import requireAuth from "../middlewares/requireAuth.js";
import { learningProgress } from "../controllers/learningProgressControllers.js";
import { validateResult } from "../middlewares/validateResult.js";
import { learningProgressValidator } from "../validators/courseValidators.js";

const learningProgressRoute = express.Router({ mergeParams: true });

learningProgressRoute
  .route("/")
  .post(
    requireAuth,
    learningProgressValidator,
    validateResult,
    learningProgress,
  );

export default learningProgressRoute;
