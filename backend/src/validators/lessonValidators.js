import { checkSchema } from "express-validator";
import {
  EnumValidator,
  htmlValidator,
  numberValidator,
  textValidator,
} from "./common.validator.js";
import {
  ACCESS_COURSE_TYPE,
  CONTENT_STATUS,
  LESSON_TYPE,
} from "../constants/constants.js";

export const lessonValidator = checkSchema({
  name: textValidator("Name"),
  status: EnumValidator("Status", CONTENT_STATUS),
  description: textValidator("Description", true, 500),
  type: EnumValidator("Type", LESSON_TYPE),
  xpPoints: numberValidator("Xp point"),
  position: numberValidator("Position"),
  accessType: EnumValidator("Access type", ACCESS_COURSE_TYPE),
  durationMinutes: numberValidator("Durations"),
});

export const lessonContentValidator = checkSchema({
  name: textValidator("Name"),
  position: numberValidator("Position"),
  content: htmlValidator("Content"),
});
