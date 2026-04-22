import express from "express";
import requireAuth from "../middlewares/requireAuth.js";
import { answerValidator } from "../validators/questionValidators.js";
import { validateResult } from "../middlewares/validateResult.js";
import {
  createAnswer,
  deleteAnswer,
  updateAnswer,
} from "../controllers/answerControllers.js";
import authorize from "../middlewares/authorize.js";
import { ADMIN, INSTRUCTOR } from "../constants/constants.js";

const answerRoute = express.Router({ mergeParams: true });

answerRoute
  .route("/")
  .post(requireAuth, answerValidator, validateResult, createAnswer);
answerRoute
  .route("/:id")
  .patch(requireAuth, authorize(INSTRUCTOR, ADMIN), updateAnswer)
  .delete(requireAuth, authorize(INSTRUCTOR, ADMIN), deleteAnswer);
export default answerRoute;
