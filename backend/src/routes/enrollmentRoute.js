import express from "express";
import { enrollCourse } from "../controllers/enrollmentControllers.js";
import { enrollmentValidator } from "../validators/courseValidators.js";
import { validateResult } from "../middlewares/validateResult.js";
import requireAuth from "../middlewares/requireAuth.js";

const enrollmentRoute = express.Router({ mergeParams: true });

enrollmentRoute
  .route("/")
  .post(requireAuth, enrollmentValidator, validateResult, enrollCourse);

export default enrollmentRoute;
