import express from "express";
import requireAuth from "../middlewares/requireAuth.js";
import authorize from "../middlewares/authorize.js";
import { INSTRUCTOR } from "../constants/constants.js";
import { lessonContentValidator } from "../validators/lessonValidators.js";
import { validateResult } from "../middlewares/validateResult.js";
import {
  createLessonContent,
  updateLessonContent,
} from "../controllers/lessonContentControllers.js";

const lessonContentRoute = express.Router({ mergeParams: true });

lessonContentRoute
  .route("/")
  .post(
    requireAuth,
    authorize(INSTRUCTOR),
    lessonContentValidator,
    validateResult,
    createLessonContent,
  );

lessonContentRoute
  .route("/:id")
  .patch(
    requireAuth,
    authorize(INSTRUCTOR),
    lessonContentValidator,
    validateResult,
    updateLessonContent,
  );

export default lessonContentRoute;
