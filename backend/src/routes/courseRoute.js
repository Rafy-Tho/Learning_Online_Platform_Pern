import express from "express";
import { INSTRUCTOR } from "../constants/constants.js";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseDetails,
  getCourseInprogress,
  getCourseLearningData,
  getPopularCourses,
  getRecentlyViewedCourses,
  getRecommendedCourses,
  updateCourse,
} from "../controllers/courseControllers.js";
import authorize from "../middlewares/authorize.js";
import requireAuth from "../middlewares/requireAuth.js";
import { validateResult } from "../middlewares/validateResult.js";
import { courseValidator } from "../validators/courseValidators.js";
import courseObjectiveRoute from "./courseObjectiveRoute.js";
import lessonRoute from "./lessonRoute.js";
import moduleRoute from "./moduleRoute.js";
import reviewRoute from "./reviewRoute.js";
import enrollmentRoute from "./enrollmentRoute.js";
import learningProgressRoute from "./learningProgressRoute.js";

const courseRoute = express.Router();

courseRoute.use("/:id/modules", moduleRoute);
courseRoute.use("/:id/objectives", courseObjectiveRoute);
courseRoute.use("/:id/lessons", lessonRoute);
courseRoute.use("/:id/reviews", reviewRoute);
courseRoute.use("/:id/enrollments", enrollmentRoute);
courseRoute.use("/:id/progresses", learningProgressRoute);
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
// get recently viewed courses
courseRoute.get("/recently-viewed", requireAuth, getRecentlyViewedCourses);
courseRoute.get("/recommended", requireAuth, getRecommendedCourses);
courseRoute.get("/popular", getPopularCourses);
courseRoute.get("/in-progress", requireAuth, getCourseInprogress);
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
