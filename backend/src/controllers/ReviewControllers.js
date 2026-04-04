import StatusCode from "../constants/StatusCode.js";
import Course from "../repositories/CourseRepository.js";
import Review from "../repositories/ReviewRepository.js";
import User from "../repositories/UserRepository.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// Get reviews by course ID
// @route GET /api/v1/courses/:id/reviews
// @desc Get all reviews for a course
// @access Public
export const getReviews = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  const userId = req.session?.user?.id || null;
  const course = await Course.findById(courseId);
  if (!course)
    return next(new ApiError(StatusCode.NOT_FOUND, "Course not found"));
  const queryString = req.query;
  const { data, pagination } = await Review.getReviews(
    queryString,
    courseId,
    userId,
  );
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Reviews retrieved successfully",
    data,
    pagination,
  });
});
// Get reviews by course ID
// @route GET /api/v1/courses/:id/reviews/summary
// @desc Get all reviews for a course
// @access Public
export const getReviewDetail = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  const course = await Course.findById(courseId);
  if (!course)
    return next(new ApiError(StatusCode.NOT_FOUND, "Course not found"));
  const review = await Review.getReviewsDetail(courseId);
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Review retrieved successfully",
    data: review,
  });
});
// Create review
// @route POST /api/v1/courses/:id/reviews
// @desc Create a review for a course
// @access Private
export const createReview = asyncHandler(async (req, res, next) => {
  const userId = req.session.user.id;
  const courseId = req.params.id;
  const course = await Course.findById(courseId);
  if (!course)
    return next(new ApiError(StatusCode.NOT_FOUND, "Course not found"));
  const { rating, description } = req.body;
  const review = description || "The user did not leave a review description";
  const reviewData = await Review.createReview({
    userId,
    courseId,
    rating,
    review,
  });
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Review created successfully",
    data: reviewData,
  });
});
export const getReview = asyncHandler(async (req, res, next) => {
  const userId = req.session.user.id;
  const courseId = req.params.id;
  const course = await Course.findById(courseId);
  if (!course)
    return next(new ApiError(StatusCode.NOT_FOUND, "Course not found"));
  const review = await Review.getReview({ userId, courseId });
  // if (!review)
  //   return next(new ApiError(StatusCode.NOT_FOUND, "Review not found"));
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Review retrieved successfully",
    data: review || null,
  });
});
// Create review helpful vote
// @route POST /api/v1/reviews/:id/helpful-votes
// @desc Create a helpful vote for a review
// @access Private
export const reviewHelpfulVote = asyncHandler(async (req, res, next) => {
  const userId = req.session?.user?.id || null;
  const reviewId = req.params.id;
  const { isHelpful } = req.body;

  const users = await User.findById(userId);
  if (!users) return next(new ApiError(StatusCode.NOT_FOUND, "User not found"));

  const review = await Review.findById(reviewId);
  if (!review)
    return next(new ApiError(StatusCode.NOT_FOUND, "Review not found"));

  const existingVote = await Review.getReviewHelpfulVote({
    userId,
    reviewId,
  });
  const isHelpfulBool = isHelpful === true || isHelpful === "true";
  if (!existingVote) {
    // 1. No vote → create
    await Review.createReviewHelpfulVote({
      userId,
      reviewId,
      isHelpful,
    });
  } else if (existingVote.is_helpful === isHelpfulBool) {
    // 2. Same vote → remove (toggle)
    await Review.deleteReviewHelpfulVote({
      userId,
      reviewId,
    });
  } else {
    // 3. Different vote → update
    await Review.updateReviewHelpfulVote({
      userId,
      reviewId,
      isHelpful,
    });
  }

  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Review helpful vote updated successfully",
  });
});
// Create review report
// @route POST /api/v1/reviews/:id/reports
// @desc Create a report for a review
// @access Private
export const createReviewReport = asyncHandler(async (req, res, next) => {
  const userId = req.session?.user?.id || null;
  const reviewId = req.params.id;
  const { reason, description } = req.body;
  const user = await User.findById(userId);
  // Check if the user exists
  if (!user) return next(new ApiError(StatusCode.NOT_FOUND, "User not found"));
  // Check if the review exists
  const review = await Review.findById(reviewId);
  if (!review)
    return next(new ApiError(StatusCode.NOT_FOUND, "Review not found"));
  // Check if the user has already reported this review
  const existingReport = await Review.getReviewReports({
    userId,
    reviewId,
  });
  if (existingReport)
    return next(
      new ApiError(StatusCode.BAD_REQUEST, "Review already reported"),
    );

  const report = await Review.createReviewReport({
    userId,
    reviewId,
    reason,
    description,
  });
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Review report created successfully",
    data: report,
  });
});
