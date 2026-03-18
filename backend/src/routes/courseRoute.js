import express from "express";
import {
  createCourse,
  deleteCourse,
  getAllCourses,
  updateCourse,
} from "../controllers/courseControllers.js";
import requireAuth from "../middlewares/requireAuth.js";
import authorize from "../middlewares/authorize.js";
import { INSTRUCTOR } from "../constants/constants.js";
import { courseValidator } from "../validators/courseValidators.js";
import { validateResult } from "../middlewares/validateResult.js";
import { upload } from "../middlewares/multer.js";
import moduleRoute from "./moduleRoute.js";

const courseRoute = express.Router();

courseRoute.use("/:id/modules", moduleRoute);

// @desc Create a course
courseRoute
  .route("/")
  .get(getAllCourses)
  .post(
    requireAuth,
    authorize(INSTRUCTOR),
    upload.single("image"),
    courseValidator,
    validateResult,
    createCourse,
  );
// @desc Update a course
courseRoute
  .route("/:id")
  .patch(
    requireAuth,
    authorize(INSTRUCTOR),
    upload.single("image"),
    courseValidator,
    validateResult,
    updateCourse,
  )
  .delete(requireAuth, authorize(INSTRUCTOR), deleteCourse);

export default courseRoute;
