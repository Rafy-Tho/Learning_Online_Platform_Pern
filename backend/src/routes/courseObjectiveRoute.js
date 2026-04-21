import express from "express";
import { validateResult } from "../middlewares/validateResult.js";
import { courseObjectiveValidator } from "../validators/courseValidators.js";
import requireAuth from "../middlewares/requireAuth.js";
import authorize from "../middlewares/authorize.js";
import { ADMIN, INSTRUCTOR } from "../constants/constants.js";
import {
  createCourseObjective,
  deleteCourseObjective,
  getCourseObjectives,
  updateCourseObjective,
} from "../controllers/courseObjectiveControllers.js";

const courseObjectiveRoute = express.Router({ mergeParams: true });

courseObjectiveRoute
  .route("/")
  .get(getCourseObjectives)
  .post(
    requireAuth,
    authorize(INSTRUCTOR, ADMIN),
    courseObjectiveValidator,
    validateResult,
    createCourseObjective,
  );

courseObjectiveRoute
  .route("/:id")
  .patch(
    requireAuth,
    authorize(INSTRUCTOR, ADMIN),
    courseObjectiveValidator,
    validateResult,
    updateCourseObjective,
  )
  .delete(requireAuth, authorize(INSTRUCTOR, ADMIN), deleteCourseObjective);

export default courseObjectiveRoute;
