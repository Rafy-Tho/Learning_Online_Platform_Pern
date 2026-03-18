import express from "express";
import {
  createChapter,
  deleteChapter,
  getChapter,
  getChapters,
} from "../controllers/chapterControllers.js";
import requireAuth from "../middlewares/requireAuth.js";
import authorize from "../middlewares/authorize.js";
import { INSTRUCTOR } from "../constants/constants.js";
import { chapterValidators } from "../validators/chapterValidators.js";
import { validateResult } from "../middlewares/validateResult.js";
import lessonRoute from "./lessonRoute.js";

const chapterRoute = express.Router({ mergeParams: true });
chapterRoute.use("/:id/lessons", lessonRoute);
chapterRoute
  .route("/")
  .get(getChapters)
  .post(
    requireAuth,
    authorize(INSTRUCTOR),
    chapterValidators,
    validateResult,
    createChapter,
  );
chapterRoute
  .route("/:id")
  .get(getChapter)
  .patch(requireAuth, authorize(INSTRUCTOR), chapterValidators, validateResult)
  .delete(requireAuth, authorize(INSTRUCTOR), deleteChapter);

export default chapterRoute;
