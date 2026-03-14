import rateLimit from "express-rate-limit";
import ApiError from "../utils/ApiError.js";

const createLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    handler: (req, res, next, options) => {
      next(new ApiError(options.statusCode, message));
    },
  });
};
export const globalLimiter = createLimiter(
  15 * 60 * 1000, // 15 minutes
  100, // Limit each IP to 100 requests per windowMs
  "Too many requests, please try again after 15 minutes",
);
export const loginLimiter = createLimiter(
  15 * 60 * 1000, // 15 minutes
  5, // Limit each IP to 5 requests per windowMs
  "Too many login attempts, please try again after 15 minutes",
);

export const passwordResetLimiter = createLimiter(
  12 * 60 * 60 * 1000, // 12 hours
  10, // Limit each IP to 10 requests per windowMs
  "Too many password reset requests, please try again after 12 hours",
);

export const codeAttemptsLimiter = createLimiter(
  60 * 60 * 1000, // 1 hour
  10, // Limit each IP to 10 requests per windowMs
  "Too many code attempts, please try again after 1 hour",
);
