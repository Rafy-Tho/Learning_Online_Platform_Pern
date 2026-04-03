import StatusCode from "../constants/StatusCode.js";
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
  // to do: validate session
  next();
}

export default requireAuth;
