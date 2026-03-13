import StatusCode from "../constants/StatusCode.js";
import sessionService from "../services/SessionService.js";
import ApiError from "../utils/ApiError.js";

function requireAuth(req, res, next) {
  if (!req.session.user) {
    return next(
      new ApiError(
        StatusCode.UNAUTHORIZED,
        "Authentication required. Please log in.",
      ),
    );
  }
  const isValidSession = sessionService.validate(req);
  if (!isValidSession) {
    return next(
      new ApiError(
        StatusCode.UNAUTHORIZED,
        "Session expired or invalid. Please log in again.",
      ),
    );
  }
  next();
}

export default requireAuth;
