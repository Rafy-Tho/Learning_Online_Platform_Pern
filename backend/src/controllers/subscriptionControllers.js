import StatusCode from '../constants/StatusCode.js';
import Subscription from '../repositories/SubscriptionRepository.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
// @desc Get subscription
// @route GET /api/v1/subscriptions/:id
// @access Public
export const getSubscription = asyncHandler(async (req, res, next) => {
  const subscription = await Subscription.findById(req.params.id);

  if (!subscription) {
    return next(new ApiError(StatusCode.BAD_REQUEST, 'Subscription not found'));
  }

  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: 'Subscription retrieved successfully',
    data: subscription,
  });
});
