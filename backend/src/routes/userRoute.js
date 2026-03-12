import express from "express";
import { validateResult } from "../middlewares/validateResult.js";
import {
  validateEmailResetCode,
  validateLogin,
  validateRegister,
  validateResetPassword,
  validateUpdatePassword,
} from "../validators/userValidators.js";
import {
  getUserInfo,
  login,
  logout,
  register,
  resetPassword,
  sendPasswordResetCode,
  updatePassword,
  updateUserInfo,
} from "../controllers/userControllers.js";
import requireAuth from "../middlewares/requireAuth.js";
const userRoute = express.Router();

userRoute.post("/register", validateRegister, validateResult, register);
userRoute.post("/login", validateLogin, validateResult, login);
userRoute.post("/logout", requireAuth, logout);
userRoute.get("/my-info", requireAuth, getUserInfo);
userRoute.patch("/update-info", requireAuth, updateUserInfo);
userRoute.post(
  "/update-password",
  requireAuth,
  validateUpdatePassword,
  validateResult,
  updatePassword,
);
userRoute.post(
  "/password-reset-code",
  validateEmailResetCode,
  validateResult,
  sendPasswordResetCode,
);
userRoute.post(
  "/reset-password",
  validateResetPassword,
  validateResult,
  resetPassword,
);

export default userRoute;
