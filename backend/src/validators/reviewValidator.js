import { checkSchema } from "express-validator";
import { booleanValidator, textValidator } from "./common.validator.js";

export const helpfulVoteValidator = checkSchema({
  isHelpful: booleanValidator("Is Helpful"),
});

export const reportValidator = checkSchema({
  reason: textValidator("Report Reason", false, 500),
  description: textValidator("Report Description", false, 500),
});
