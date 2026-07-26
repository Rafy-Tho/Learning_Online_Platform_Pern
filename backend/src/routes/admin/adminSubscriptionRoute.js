import express from "express";
import {
  getPlans,
  createPlan,
  updatePlan,
  deletePlan,
  getUserSubscriptions,
  createUserSubscription,
  updateUserSubscription,
  deleteUserSubscription,
  getPayments,
  createPayment,
  deletePayment,
} from "../../controllers/adminSubscriptionControllers.js";
import requireAuth from "../../middlewares/requireAuth.js";
import authorize from "../../middlewares/authorize.js";
import { ADMIN } from "../../constants/constants.js";

const adminSubscriptionRoute = express.Router();

adminSubscriptionRoute.use(requireAuth, authorize(ADMIN));

// Plan routes
adminSubscriptionRoute.route("/plans").get(getPlans).post(createPlan);
adminSubscriptionRoute.route("/plans/:id").patch(updatePlan).delete(deletePlan);

// User Subscription routes
adminSubscriptionRoute
  .route("/user-subscriptions")
  .get(getUserSubscriptions)
  .post(createUserSubscription);
adminSubscriptionRoute
  .route("/user-subscriptions/:id")
  .patch(updateUserSubscription)
  .delete(deleteUserSubscription);

// Payment routes
adminSubscriptionRoute.route("/payments").get(getPayments).post(createPayment);
adminSubscriptionRoute.route("/payments/:id").delete(deletePayment);

export default adminSubscriptionRoute;
