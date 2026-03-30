import express from "express";
import { INSTRUCTOR } from "../constants/constants.js";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseDetails,
  getCourseLearningData,
  updateCourse,
} from "../controllers/courseControllers.js";
import authorize from "../middlewares/authorize.js";
import requireAuth from "../middlewares/requireAuth.js";
import { validateResult } from "../middlewares/validateResult.js";
import { courseValidator } from "../validators/courseValidators.js";
import courseObjectiveRoute from "./courseObjectiveRoute.js";
import lessonRoute from "./lessonRoute.js";
import moduleRoute from "./moduleRoute.js";

const courseRoute = express.Router();

courseRoute.use("/:id/modules", moduleRoute);
courseRoute.use("/:id/objectives", courseObjectiveRoute);
courseRoute.use("/:id/lessons", lessonRoute);
// @desc Create a course
courseRoute
  .route("/")
  .get(getAllCourses)
  .post(
    requireAuth,
    authorize(INSTRUCTOR),
    courseValidator,
    validateResult,
    createCourse,
  );
// @desc Update a course
courseRoute
  .route("/:id")
  .get(getCourseDetails)
  .patch(
    requireAuth,
    authorize(INSTRUCTOR),
    courseValidator,
    validateResult,
    updateCourse,
  )
  .delete(requireAuth, authorize(INSTRUCTOR), deleteCourse);
courseRoute.get("/:id/learn", getCourseLearningData);
export default courseRoute;
