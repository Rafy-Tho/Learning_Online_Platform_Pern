import StatusCode from "../constants/statusCode.js";
import ApiError from "./ApiError.js";

const notFoundUrl = (req, res, next) => {
  next(new ApiError(StatusCode.NOT_FOUND, "Not Found " + req.originalUrl));
};
export default notFoundUrl;
