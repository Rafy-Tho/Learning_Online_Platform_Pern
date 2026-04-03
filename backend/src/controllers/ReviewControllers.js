import StatusCode from "../constants/StatusCode.js";
import Course from "../repositories/CourseRepository.js";
import Review from "../repositories/ReviewRepository.js";
import User from "../repositories/UserRepository.js";
import ApiError from "../utils/ApiError.js";

// Get reviews by course ID
// @route GET /api/v1/courses/:id/reviews
// @desc Get all reviews for a course
// @access Public
export const getReviews = async (req, res, next) => {
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
};
// Get reviews by course ID
// @route GET /api/v1/courses/:id/reviews/summary
// @desc Get all reviews for a course
// @access Public
export const getReviewDetail = async (req, res, next) => {
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
};
// Create review
// @route POST /api/v1/courses/:id/reviews
// @desc Create a review for a course
// @access Private
export const createReview = async (req, res, next) => {
  const userId = req.session.user.id;
  const courseId = req.params.id;
  const course = await Course.findById(courseId);
  if (!course)
    return next(new ApiError(StatusCode.NOT_FOUND, "Course not found"));

  const { rating, review } = req.body;
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
};
// Create review helpful vote
// @route POST /api/v1/reviews/:id/helpful-votes
// @desc Create a helpful vote for a review
// @access Private
export const reviewHelpfulVote = async (req, res, next) => {
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
  if (!existingVote) {
    // 1. No vote → create
    await Review.createReviewHelpfulVote({
      userId,
      reviewId,
      isHelpful,
    });
  } else if (Boolean(existingVote.is_helpful) === Boolean(isHelpful)) {
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
};
