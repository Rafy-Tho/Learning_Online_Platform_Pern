export const emailValidator = (field, optional = false) => ({
  in: ["body"],
  trim: true,
  normalizeEmail: true,
  ...(optional && {
    optional: {
      options: { nullable: true, checkFalsy: true },
    },
  }),
  ...(!optional && {
    notEmpty: {
      errorMessage: `${field} is required`,
      bail: true,
    },
  }),
  isEmail: {
    errorMessage: `${field} must be a valid email`,
  },
  isLength: {
    options: { max: 100 },
    errorMessage: `${field} must be at most 100 characters`,
  },
});

export const passwordValidator = (field) => ({
  in: ["body"],
  notEmpty: {
    errorMessage: `${field} is required`,
    bail: true,
  },
  isLength: {
    options: { min: 8, max: 100 },
    errorMessage: `${field} must be between 8 and 100 characters`,
    bail: true,
  },
  isStrongPassword: {
    options: {
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    errorMessage: `${field} must contain uppercase, lowercase, number and symbol`,
  },
});

export const shortTextValidator = (field, optional = false) => ({
  in: ["body"],
  trim: true,
  ...(optional && {
    optional: {
      options: { nullable: true, checkFalsy: true },
    },
  }),
  ...(!optional && {
    notEmpty: {
      errorMessage: `${field} is required`,
      bail: true,
    },
  }),
  isLength: {
    options: { min: 3, max: 50 },
    errorMessage: `${field} must be between 3 and 50 characters`,
  },
});
export const longTextValidator = (field, optional = false) => ({
  in: ["body"],
  trim: true,
  ...(optional && {
    optional: {
      options: { nullable: true, checkFalsy: true },
    },
  }),
  ...(!optional && {
    notEmpty: {
      errorMessage: `${field} is required`,
      bail: true,
    },
  }),
  isLength: {
    options: { min: 3, max: 200 },
    errorMessage: `${field} must be between 3 and 200 characters`,
  },
});
// validateUrl
export const urlValidator = (field, optional = false) => ({
  in: ["body"],
  trim: true,
  ...(optional && {
    optional: {
      options: { nullable: true, checkFalsy: true },
    },
  }),
  ...(!optional && {
    notEmpty: {
      errorMessage: `${field} is required`,
      bail: true,
    },
  }),
  isURL: {
    options: {
      protocols: ["http", "https"],
      require_protocol: true,
    },
    errorMessage: `${field} must be a valid URL`,
  },
  isLength: {
    options: { max: 255 },
    errorMessage: `${field} must be at most 255 characters`,
  },
});

export const codeValidator = (fieldName) => ({
  in: ["body"],
  notEmpty: {
    errorMessage: `${fieldName} is required`,
    bail: true,
  },
  isLength: {
    options: { min: 6, max: 6 },
    errorMessage: `${fieldName} must be 6 characters long`,
  },
});
