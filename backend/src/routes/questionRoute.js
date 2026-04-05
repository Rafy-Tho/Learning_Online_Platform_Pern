import express from "express";
import requireAuth from "../middlewares/requireAuth.js";
import { validateResult } from "../middlewares/validateResult.js";
import { questionValidator } from "../validators/questionValidators.js";
import { createQuestion } from "../controllers/questionControllers.js";
import answerRoute from "./answerRoute.js";
import { getQuestions } from "../controllers/lessonControllers.js";

const questionRoute = express.Router({ mergeParams: true });
questionRoute.use("/:id/answers", answerRoute);
questionRoute
  .route("/")
  .get(getQuestions)
  .post(requireAuth, questionValidator, validateResult, createQuestion);

export default questionRoute;
