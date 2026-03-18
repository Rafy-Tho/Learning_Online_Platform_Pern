import { checkSchema } from "express-validator";
import { CONTENT_STATUS } from "../constants/constants.js";
import {
  EnumValidator,
  floatValidator,
  numberValidator,
  textValidator,
  uuidValidator,
} from "./common.validator.js";

export const courseValidator = checkSchema({
  categoryId: uuidValidator("Category ID"),
  name: textValidator("Course Name"),
  slug: textValidator("Course Slug"),
  description: textValidator("Course Description", false, 500),
  status: EnumValidator("Course Status", CONTENT_STATUS),
  price: floatValidator("Course Price"),
  position: numberValidator("Course Position", true),
});
