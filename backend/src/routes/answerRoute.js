import express from "express";
import requireAuth from "../middlewares/requireAuth.js";
import { answerValidator } from "../validators/questionValidators.js";
import { validateResult } from "../middlewares/validateResult.js";
import { createAnswer } from "../controllers/answerController.js";

const answerRoute = express.Router({ mergeParams: true });

answerRoute
  .route("/")
  .post(requireAuth, answerValidator, validateResult, createAnswer);

export default answerRoute;
