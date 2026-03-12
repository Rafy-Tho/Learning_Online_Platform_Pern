import { checkSchema } from "express-validator";
const email = {
  in: ["body"],
  trim: true,
  notEmpty: {
    errorMessage: "Email is required",
    bail: true,
  },
  isEmail: {
    errorMessage: "Email must be a valid email address",
  },
};
const password = {
  in: ["body"],
  notEmpty: {
    errorMessage: "Password is required",
    bail: true,
  },
  isLength: {
    options: { min: 8 },
    errorMessage: "Password must be at least 8 characters long",
    bail: true,
  },
  isStrongPassword: {
    errorMessage: "Password must be strong",
  },
};
const name = {
  in: ["body"],
  trim: true,
  notEmpty: {
    errorMessage: "Name is required",
    bail: true,
  },
  isLength: {
    options: { min: 3, max: 50 },
    errorMessage: "Name must be between 3 and 50 characters long",
  },
};
export const validateRegister = checkSchema({
  name,
  email,
  password,
});

export const validateLogin = checkSchema({
  email,
  password,
});

export const validateUpdatePassword = checkSchema({
  oldPassword: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Old password is required",
      bail: true,
    },
    isLength: {
      options: { min: 8 },
      errorMessage: "Old password must be at least 8 characters long",
      bail: true,
    },
    isStrongPassword: {
      errorMessage: "Old password must be strong",
    },
  },
  newPassword: {
    in: ["body"],
    notEmpty: {
      errorMessage: "New password is required",
      bail: true,
    },
    isLength: {
      options: { min: 8 },
      errorMessage: "New password must be at least 8 characters long",
      bail: true,
    },
    isStrongPassword: {
      errorMessage: "New password must be strong",
    },
  },
});

export const validateResetPassword = checkSchema({
  code: {
    in: ["body"],
    notEmpty: {
      errorMessage: "Reset code is required",
      bail: true,
    },
    isLength: {
      options: { min: 6, max: 6 },
      errorMessage: "Reset code must be 6 characters long",
    },
  },
  email,
  password,
});

export const validateEmailResetCode = checkSchema({
  email,
});
