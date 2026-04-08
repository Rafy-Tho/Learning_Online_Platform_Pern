import express from "express";
import requireAuth from "../middlewares/requireAuth.js";
import { lessonCompletionValidator } from "../validators/courseValidators.js";
import { validateResult } from "../middlewares/validateResult.js";
import { lessonCompletion } from "../controllers/lessonCompletionControllers.js";
const lessonCompletionRoute = express.Router({ mergeParams: true });

lessonCompletionRoute
  .route("/")
  .post(
    requireAuth,
    lessonCompletionValidator,
    validateResult,
    lessonCompletion,
  );
export default lessonCompletionRoute;
