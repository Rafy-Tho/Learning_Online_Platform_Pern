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
// @desc Get user active subscriptions
// @route GET /api/v1/subscriptions/user-active
// @access Private
export const getUserActiveSubscriptions = asyncHandler(
  async (req, res, next) => {
    const userId = req.session.user.id;
    const subscriptions = await Subscription.getActivePaidSubscription(userId);
    res.status(StatusCode.OK).json({
      success: true,
      statusCode: StatusCode.OK,
      message: 'Subscriptions retrieved successfully',
      data: subscriptions ? subscriptions : null,
    });
  },
);
