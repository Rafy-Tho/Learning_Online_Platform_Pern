import express from "express";
import requireAuth from "../middlewares/requireAuth.js";
import { validateResult } from "../middlewares/validateResult.js";
import { questionValidator } from "../validators/questionValidators.js";
import {
  createQuestion,
  deleteQuestion,
  updateQuestion,
} from "../controllers/questionControllers.js";
import answerRoute from "./answerRoute.js";
import { getQuestions } from "../controllers/lessonControllers.js";
import authorize from "../middlewares/authorize.js";
import { ADMIN, INSTRUCTOR } from "../constants/constants.js";

const questionRoute = express.Router({ mergeParams: true });
questionRoute.use("/:id/options", answerRoute);
questionRoute
  .route("/")
  .get(getQuestions)
  .post(
    requireAuth,
    authorize(ADMIN, INSTRUCTOR),
    questionValidator,
    validateResult,
    createQuestion,
  );
questionRoute
  .route("/:id")
  .patch(
    requireAuth,
    authorize(ADMIN, INSTRUCTOR),
    questionValidator,
    validateResult,
    updateQuestion,
  )
  .delete(requireAuth, authorize(ADMIN, INSTRUCTOR), deleteQuestion);
export default questionRoute;
