import express from "express";
import {
  enrollCourse,
  getEnrollment,
} from "../controllers/enrollmentControllers.js";
import requireAuth from "../middlewares/requireAuth.js";

const enrollmentRoute = express.Router({ mergeParams: true });

enrollmentRoute
  .route("/")
  .post(requireAuth, enrollCourse)
  .get(requireAuth, getEnrollment);

export default enrollmentRoute;
