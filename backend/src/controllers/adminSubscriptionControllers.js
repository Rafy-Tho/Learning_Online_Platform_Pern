import StatusCode from "../constants/StatusCode.js";
import Subscription from "../repositories/SubscriptionRepository.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// Plan CRUD
export const getPlans = asyncHandler(async (req, res, next) => {
  const plans = await Subscription.findAllPlans();
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Plans retrieved successfully",
    data: plans,
  });
});

export const createPlan = asyncHandler(async (req, res, next) => {
  const { name, duration_days, price } = req.body;
  if (!name || !duration_days || price === undefined) {
    return next(
      new ApiError(
        StatusCode.BAD_REQUEST,
        "Name, duration_days, and price are required",
      ),
    );
  }
  const plan = await Subscription.createPlan({
    name,
    durationDays: duration_days,
    price,
  });
  res.status(StatusCode.CREATED).json({
    success: true,
    statusCode: StatusCode.CREATED,
    message: "Plan created successfully",
    data: plan,
  });
});

export const updatePlan = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, duration_days, price } = req.body;
  const existing = await Subscription.findById(id);
  if (!existing) {
    return next(new ApiError(StatusCode.NOT_FOUND, "Plan not found"));
  }
  const plan = await Subscription.updatePlan(id, {
    name: name || existing.name,
    durationDays: duration_days || existing.duration_days,
    price: price !== undefined ? price : existing.price,
  });
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Plan updated successfully",
    data: plan,
  });
});

export const deletePlan = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const existing = await Subscription.findById(id);
  if (!existing) {
    return next(new ApiError(StatusCode.NOT_FOUND, "Plan not found"));
  }
  await Subscription.deletePlan(id);
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Plan deleted successfully",
    data: null,
  });
});

// User Subscription CRUD
export const getUserSubscriptions = asyncHandler(async (req, res, next) => {
  const subscriptions = await Subscription.findAllUserSubscriptions();
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "User subscriptions retrieved successfully",
    data: subscriptions,
  });
});

export const createUserSubscription = asyncHandler(async (req, res, next) => {
  const { user_id, plan_id, start_date, end_date, status } = req.body;
  if (!user_id || !plan_id) {
    return next(
      new ApiError(StatusCode.BAD_REQUEST, "user_id and plan_id are required"),
    );
  }
  const subscription = await Subscription.AdminCreateUserSubscription({
    userId: user_id,
    planId: plan_id,
    startDate: start_date || new Date().toISOString(),
    endDate: end_date,
    status,
  });
  res.status(StatusCode.CREATED).json({
    success: true,
    statusCode: StatusCode.CREATED,
    message: "User subscription created successfully",
    data: subscription,
  });
});

export const updateUserSubscription = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { user_id, plan_id, start_date, end_date, status } = req.body;
  const existing = await Subscription.findAllUserSubscriptions();
  const found = existing.find((s) => s.id === id);
  if (!found) {
    return next(
      new ApiError(StatusCode.NOT_FOUND, "User subscription not found"),
    );
  }
  const subscription = await Subscription.updateUserSubscription(id, {
    userId: user_id || found.user_id,
    planId: plan_id || found.plan_id,
    startDate: start_date || found.start_date,
    endDate: end_date || found.end_date,
    status: status || found.status,
  });
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "User subscription updated successfully",
    data: subscription,
  });
});

export const deleteUserSubscription = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await Subscription.deleteUserSubscription(id);
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "User subscription deleted successfully",
    data: null,
  });
});

// Payment CRUD
export const getPayments = asyncHandler(async (req, res, next) => {
  const payments = await Subscription.findAllPayments();
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Payments retrieved successfully",
    data: payments,
  });
});

export const createPayment = asyncHandler(async (req, res, next) => {
  const {
    user_subscription_id,
    amount,
    payment_status,
    stripe_payment_intent_id,
  } = req.body;
  if (!user_subscription_id || amount === undefined) {
    return next(
      new ApiError(
        StatusCode.BAD_REQUEST,
        "user_subscription_id and amount are required",
      ),
    );
  }
  const payment = await Subscription.AdminCreatePayment({
    userSubscriptionId: user_subscription_id,
    amount,
    paymentStatus: payment_status,
    stripePaymentIntentId: stripe_payment_intent_id,
  });
  res.status(StatusCode.CREATED).json({
    success: true,
    statusCode: StatusCode.CREATED,
    message: "Payment created successfully",
    data: payment,
  });
});

export const updatePayment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { amount, payment_status, stripe_payment_intent_id } = req.body;
  const payments = await Subscription.findAllPayments();
  const existing = payments.find((p) => p.id === id);
  if (!existing) {
    return next(new ApiError(StatusCode.NOT_FOUND, "Payment not found"));
  }
  const payment = await Subscription.updatePayment(id, {
    amount: amount !== undefined ? amount : existing.amount,
    paymentStatus: payment_status || existing.payment_status,
    stripePaymentIntentId:
      stripe_payment_intent_id !== undefined
        ? stripe_payment_intent_id
        : existing.stripe_payment_intent_id,
  });
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Payment updated successfully",
    data: payment,
  });
});

export const deletePayment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  await Subscription.deletePayment(id);
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Payment deleted successfully",
    data: null,
  });
});
