import DOMPurify from "isomorphic-dompurify";
export const emailValidator = (field, optional = false) => ({
  in: ["body"],
  trim: true,
  escape: true,
  toLowerCase: true,
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

export const textValidator = (field, optional = false, maxLength = 50) => ({
  in: ["body"],
  trim: true,
  escape: true,
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
    options: { min: 3, max: maxLength },
    errorMessage: `${field} must be between 3 and ${maxLength} characters`,
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
  trim: true,
  escape: true,
  notEmpty: {
    errorMessage: `${fieldName} is required`,
    bail: true,
  },
  isNumeric: {
    errorMessage: `${fieldName} must be a number`,
    bail: true,
  },
  isLength: {
    options: { min: 6, max: 6 },
    errorMessage: `${fieldName} must be 6 characters long`,
  },
});

export const uuidValidator = (fieldName) => ({
  in: ["body"],
  trim: true,
  escape: true,
  notEmpty: {
    errorMessage: `${fieldName} is required`,
    bail: true,
  },
  isUUID: {
    errorMessage: `${fieldName} must be a valid UUID`,
  },
});

export const numberValidator = (fieldName, option = false) => ({
  in: ["body"],
  trim: true,
  escape: true,
  toInt: true,
  ...(option && {
    optional: {
      options: { nullable: true, checkFalsy: true },
    },
  }),
  ...(!option && {
    notEmpty: {
      errorMessage: `${fieldName} is required`,
      bail: true,
    },
  }),
  isInt: {
    options: { min: 0, max: 1_000_000_000 },
    errorMessage: `${fieldName} must be between 0 and 1000,000,000`,
  },
});

export const floatValidator = (fieldName) => ({
  in: ["body"],
  trim: true,
  escape: true,
  toFloat: true,
  notEmpty: {
    errorMessage: `${fieldName} is required`,
    bail: true,
  },
  isFloat: {
    options: { min: 0, max: 1_000_000_000 },
    errorMessage: `${fieldName} must be between 0 and 1000,000,000`,
  },
});

export const EnumValidator = (fieldName, values) => ({
  in: ["body"],
  trim: true,
  escape: true,
  notEmpty: {
    errorMessage: `${fieldName} is required`,
    bail: true,
  },
  isIn: {
    options: [values],
    errorMessage: `${fieldName} must be either ${values.join(" or ")}`,
  },
  isLength: {
    options: { min: 1, max: 100 },
    errorMessage: `${fieldName} must be between 1 and 100 characters`,
  },
});

export const htmlValidator = (fieldName) => ({
  in: ["body"],
  trim: true,
  notEmpty: {
    errorMessage: `${fieldName} is required`,
    bail: true,
  },
  custom: {
    options: (value, { req }) => {
      const hasTag = /<\/?[a-z][\s\S]*>/i.test(value);

      if (!hasTag) {
        throw new Error(`${fieldName} must contain valid HTML`);
      }

      // sanitize and attach to request
      req.body[fieldName] = DOMPurify.sanitize(value);

      return true;
    },
  },
  isLength: {
    options: { max: 1_000_000 },
    errorMessage: `${fieldName} must be at most 1,000,000 characters`,
  },
});
