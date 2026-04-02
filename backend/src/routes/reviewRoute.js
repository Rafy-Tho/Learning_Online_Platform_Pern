import express from "express";
import {
  getReviewDetail,
  getReviews,
} from "../controllers/ReviewControllers.js";

const reviewRoute = express.Router({ mergeParams: true });

reviewRoute.route("/").get(getReviews);
reviewRoute.route("/summary").get(getReviewDetail);

export default reviewRoute;
