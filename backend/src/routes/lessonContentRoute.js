import express from "express";
import requireAuth from "../middlewares/requireAuth.js";
import authorize from "../middlewares/authorize.js";
import { ADMIN, INSTRUCTOR } from "../constants/constants.js";
import { lessonContentValidator } from "../validators/lessonValidators.js";
import { validateResult } from "../middlewares/validateResult.js";
import {
  createLessonContent,
  deleteLessonContent,
  getLessonContents,
  updateLessonContent,
} from "../controllers/lessonContentControllers.js";

const lessonContentRoute = express.Router({ mergeParams: true });

lessonContentRoute
  .route("/")
  .get(getLessonContents)
  .post(
    requireAuth,
    authorize(INSTRUCTOR, ADMIN),
    lessonContentValidator,
    validateResult,
    createLessonContent,
  );

lessonContentRoute
  .route("/:id")
  .patch(
    requireAuth,
    authorize(INSTRUCTOR, ADMIN),
    lessonContentValidator,
    validateResult,
    updateLessonContent,
  )
  .delete(requireAuth, authorize(INSTRUCTOR, ADMIN), deleteLessonContent);

export default lessonContentRoute;
