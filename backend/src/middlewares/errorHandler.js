import StatusCode from '../constants/StatusCode.js';
function getUniqueMessage(err) {
  const field = err.detail?.match(/\((.*?)\)/)?.[1];

  if (field) {
    return `${formatField(field)} already exists. Please use a different one.`;
  }

  return 'This value already exists. Please use a different one.';
}

function getRequiredFieldMessage(err) {
  const field = err.column;

  if (field) {
    return `${formatField(field)} is required.`;
  }

  return 'Please fill in all required fields.';
}

function formatField(field) {
  return field
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || StatusCode.INTERNAL_SERVER_ERROR;
  let message = err.message || 'Internal Server Error';
  // PostgreSQL error codes
  if (err.code) {
    switch (err.code) {
      case '23505': // unique_violation
        statusCode = StatusCode.CONFLICT;
        message = getUniqueMessage(err);
        break;

      case '23503': // foreign_key_violation
        statusCode = StatusCode.BAD_REQUEST;
        message = 'The selected item does not exist or is no longer available.';
        break;

      case '23502': // not_null_violation
        statusCode = StatusCode.BAD_REQUEST;
        message = getRequiredFieldMessage(err);
        break;

      case '22P02': // invalid_text_representation
        statusCode = StatusCode.BAD_REQUEST;
        message = 'Invalid input. Please check your data and try again.';
        break;

      default:
        statusCode = StatusCode.INTERNAL_SERVER_ERROR;
        message = 'Something went wrong. Please try again later.';
    }
  }
  const show = process.env.NODE_ENV === 'development';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(show && {
      stack: err.stack,
      error: err,
    }),
  });
}

export default errorHandler;
