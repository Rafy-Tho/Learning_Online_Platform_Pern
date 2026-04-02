import StatusCode from "../constants/StatusCode.js";
import Review from "../repositories/ReviewRepository.js";

// Get reviews by course ID
// @route GET /api/v1/courses/:id/reviews
// @desc Get all reviews for a course
// @access Public
export const getReviews = async (req, res) => {
  const courseId = req.params.id;
  const userId = req?.session?.user?.id || null;
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
export const getReviewDetail = async (req, res) => {
  const courseId = req.params.id;
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
export const createReview = async (req, res) => {
  const userId = req.session.user.id;
  const courseId = req.params.id;
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
