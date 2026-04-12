import { checkSchema } from "express-validator";
import {
  codeValidator,
  dateValidator,
  emailValidator,
  EnumValidator,
  numberValidator,
  passwordValidator,
  textValidator,
} from "./common.validator.js";

// validateRegister
export const validateRegister = checkSchema({
  name: textValidator("Name"),
  email: emailValidator("Email"),
  password: passwordValidator("Password"),
});
// validateLogin
export const validateLogin = checkSchema({
  email: emailValidator("Email"),
  password: passwordValidator("Password"),
});
// validateUpdateProfile
export const validateUpdateProfile = checkSchema({
  name: textValidator("Name", true),
  email: emailValidator("Email", true),
  bio: textValidator("Bio", true, 200),
  location: textValidator("Location", true, 200),
  dateBirth: dateValidator("Date of birth", true),
  phone: numberValidator("Phone", true),
  gender: EnumValidator("Gender", ["Male", "Female"], true),
});
// validateUpdatePassword
export const validateUpdatePassword = checkSchema({
  oldPassword: passwordValidator("Old Password"),
  newPassword: passwordValidator("New Password"),
});
// validateResetPassword
export const validateResetPassword = checkSchema({
  code: codeValidator("Reset Code"),
  email: emailValidator("Email"),
  password: passwordValidator("Password"),
});
// validateEmailResetCode
export const validateEmailResetCode = checkSchema({
  email: emailValidator("Email"),
});
// validateSendResetPasswordCode
export const validateSendResetPasswordCode = checkSchema({
  email: emailValidator("Email"),
  code: codeValidator("Reset Code"),
});
