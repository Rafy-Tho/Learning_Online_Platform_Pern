import express from "express";
import {
  getReviewDetail,
  getReviews,
  reviewHelpfulVote,
} from "../controllers/ReviewControllers.js";
import requireAuth from "../middlewares/requireAuth.js";
import { validateResult } from "../middlewares/validateResult.js";
import { helpfulVoteValidator } from "../validators/courseValidators.js";

const reviewRoute = express.Router({ mergeParams: true });

reviewRoute.route("/").get(getReviews);
reviewRoute.route("/summary").get(getReviewDetail);
reviewRoute
  .route("/:id/helpful-votes")
  .post(requireAuth, helpfulVoteValidator, validateResult, reviewHelpfulVote);
export default reviewRoute;
