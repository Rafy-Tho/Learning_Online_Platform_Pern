import express from "express";
import {
  createReview,
  createReviewReport,
  getReview,
  getReviewDetail,
  getReviews,
  reviewHelpfulVote,
} from "../controllers/ReviewControllers.js";
import requireAuth from "../middlewares/requireAuth.js";
import { validateResult } from "../middlewares/validateResult.js";
import {
  helpfulVoteValidator,
  reportValidator,
  reviewValidator,
} from "../validators/reviewValidator.js";

const reviewRoute = express.Router({ mergeParams: true });

reviewRoute
  .route("/")
  .get(getReviews)
  .post(requireAuth, reviewValidator, validateResult, createReview);
reviewRoute.route("/summary").get(getReviewDetail);
reviewRoute
  .route("/:id/helpful-votes")
  .post(requireAuth, helpfulVoteValidator, validateResult, reviewHelpfulVote);
reviewRoute
  .route("/:id/reports")
  .post(requireAuth, reportValidator, validateResult, createReviewReport);
reviewRoute.route("/me").get(requireAuth, getReview);
export default reviewRoute;
