import { checkSchema } from "express-validator";
import {
  booleanValidator,
  floatValidator,
  textValidator,
} from "./common.validator.js";

export const helpfulVoteValidator = checkSchema({
  isHelpful: booleanValidator("Is Helpful"),
});

export const reportValidator = checkSchema({
  reason: textValidator("Report Reason", false, 500),
  description: textValidator("Report Description", false, 500),
});

export const reviewValidator = checkSchema({
  description: textValidator("Review Description", true, 500),
  rating: floatValidator("Rating"),
});
