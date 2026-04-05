import express from "express";
import requireAuth from "../middlewares/requireAuth.js";
import authorize from "../middlewares/authorize.js";
import { INSTRUCTOR } from "../constants/constants.js";
import { lessonValidator } from "../validators/lessonValidators.js";
import { validateResult } from "../middlewares/validateResult.js";
import {
  createLesson,
  deleteLesson,
  getFirstLesson,
  updateLesson,
} from "../controllers/lessonControllers.js";
import lessonContentRoute from "./lessonContentRoute.js";
import questionRoute from "./questionRoute.js";
const lessonRoute = express.Router({ mergeParams: true });

lessonRoute.use("/:id/contents", lessonContentRoute);
lessonRoute.use("/:id/questions", questionRoute);
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

lessonRoute.get("/first", getFirstLesson);
export default lessonRoute;
