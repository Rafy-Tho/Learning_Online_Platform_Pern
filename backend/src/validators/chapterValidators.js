import { checkSchema } from "express-validator";
import { numberValidator, textValidator } from "./common.validator.js";
import { CONTENT_STATUS } from "../constants/constants.js";

export const chapterValidators = checkSchema({
  name: textValidator("Chapter name"),
  description: textValidator("Chapter description", true),
  position: numberValidator("Chapter position"),
  status: textValidator("Chapter status", CONTENT_STATUS),
});
