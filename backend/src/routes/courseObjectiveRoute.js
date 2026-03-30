import express from "express";
import { validateResult } from "../middlewares/validateResult.js";
import { courseObjectiveValidator } from "../validators/courseValidators.js";
import requireAuth from "../middlewares/requireAuth.js";
import authorize from "../middlewares/authorize.js";
import { INSTRUCTOR } from "../constants/constants.js";
import {
  createCourseObjective,
  getCourseObjectives,
  updateCourseObjective,
} from "../controllers/courseObjectiveControllers.js";

const courseObjectiveRoute = express.Router({ mergeParams: true });

courseObjectiveRoute
  .route("/")
  .get(getCourseObjectives)
  .post(
    requireAuth,
    authorize(INSTRUCTOR),
    courseObjectiveValidator,
    validateResult,
    createCourseObjective,
  );

courseObjectiveRoute.patch(
  "/:id",
  requireAuth,
  authorize(INSTRUCTOR),
  courseObjectiveValidator,
  validateResult,
  updateCourseObjective,
);

export default courseObjectiveRoute;
