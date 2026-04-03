import { checkSchema } from "express-validator";
import {
  ACCESS_COURSE_TYPE,
  CONTENT_STATUS,
  COURSE_LEVEL,
} from "../constants/constants.js";
import {
  booleanValidator,
  EnumValidator,
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
  position: numberValidator("Course Position"),
  level: EnumValidator("Course Level", COURSE_LEVEL),
  accessType: EnumValidator("Course Access Type", ACCESS_COURSE_TYPE),
});

export const courseObjectiveValidator = checkSchema({
  position: numberValidator("Course Objective Position"),
  content: textValidator("Course Objective", false, 500),
});

export const helpfulVoteValidator = checkSchema({
  isHelpful: booleanValidator("Is Helpful"),
});
