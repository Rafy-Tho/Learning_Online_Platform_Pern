import express from "express";
import requireAuth from "../middlewares/requireAuth.js";
import authorize from "../middlewares/authorize.js";
import { INSTRUCTOR } from "../constants/constants.js";
import { lessonValidator } from "../validators/lessonValidators.js";
import { validateResult } from "../middlewares/validateResult.js";
import {
  createLesson,
  deleteLesson,
  updateLesson,
} from "../controllers/lessonControllers.js";

const lessonRoute = express.Router({ mergeParams: true });

lessonRoute
  .route("/")
  .post(
    requireAuth,
    authorize(INSTRUCTOR),
    lessonValidator,
    validateResult,
    createLesson,
  );

lessonRoute
  .route("/:id")
  .patch(
    requireAuth,
    authorize(INSTRUCTOR),
    lessonValidator,
    validateResult,
    updateLesson,
  )
  .delete(requireAuth, authorize(INSTRUCTOR), deleteLesson);

export default lessonRoute;
