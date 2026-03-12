import StatusCode from "../constants/statusCode.js";
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || StatusCode.INTERNAL_SERVER_ERROR;
  let message = err.message || "Internal Server Error";

  // PostgreSQL error codes
  if (err.code) {
    switch (err.code) {
      case "23505": // unique_violation
        statusCode = StatusCode.CONFLICT;
        message = "Duplicate value. This record already exists.";
        break;

      case "23503": // foreign_key_violation
        statusCode = StatusCode.BAD_REQUEST;
        message = "Invalid reference. Related record not found.";
        break;

      case "23502": // not_null_violation
        statusCode = StatusCode.BAD_REQUEST;
        message = "Missing required field.";
        break;

      case "22P02": // invalid_text_representation
        statusCode = StatusCode.BAD_REQUEST;
        message = "Invalid input syntax.";
        break;

      default:
        statusCode = StatusCode.INTERNAL_SERVER_ERROR;
        message = "Database error";
    }
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
}

export default errorHandler;
