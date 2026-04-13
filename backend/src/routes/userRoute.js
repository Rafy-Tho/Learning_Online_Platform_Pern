import express from "express";
import {
  createStripeSession,
  getMe,
  getProfile,
  getXpEarning,
  login,
  logout,
  register,
  resetPassword,
  sendPasswordResetCode,
  updatePassword,
  updateProfile,
  verifyPasswordResetCode,
} from "../controllers/userControllers.js";
import { upload } from "../middlewares/multer.js";
import {
  codeAttemptsLimiter,
  passwordResetLimiter,
} from "../middlewares/rateLimitMiddlewares.js";
import requireAuth from "../middlewares/requireAuth.js";
import { validateResult } from "../middlewares/validateResult.js";
import {
  validateEmailResetCode,
  validateLogin,
  validateRegister,
  validateResetPassword,
  validateSendResetPasswordCode,
  validateUpdatePassword,
  validateUpdateProfile,
} from "../validators/userValidators.js";

const userRoute = express.Router();

// @desc    Register a new user
userRoute.post("/register", validateRegister, validateResult, register);
// @desc    Login a user
userRoute.post("/login", validateLogin, validateResult, login);
// @desc    Logout a user
userRoute.post("/logout", requireAuth, logout);
// @desc    Get user profile
userRoute.get("/me", getMe);
userRoute.get("/profile", requireAuth, getProfile);
userRoute.get("/xp-earned", requireAuth, getXpEarning);

// @desc    Update user profile
userRoute.patch(
  "/profile",
  requireAuth,
  upload.single("image"),
  validateUpdateProfile,
  validateResult,
  updateProfile,
);
// @desc    Update user password
userRoute.patch(
  "/update-password",
  requireAuth,
  validateUpdatePassword,
  validateResult,
  updatePassword,
);
// @desc    Send password reset code
userRoute.post(
  "/password-reset-code",
  passwordResetLimiter,
  validateEmailResetCode,
  validateResult,
  sendPasswordResetCode,
);
// @desc    Verify password reset code
userRoute.post(
  "/verify-password-reset-code",
  codeAttemptsLimiter,
  validateSendResetPasswordCode,
  validateResult,
  verifyPasswordResetCode,
);
// @desc    Reset user password
userRoute.post(
  "/reset-password",
  codeAttemptsLimiter,
  validateResetPassword,
  validateResult,
  resetPassword,
);

userRoute.post(
  "/payment-stripe/:subscriptionId",
  requireAuth,
  createStripeSession,
);
export default userRoute;
