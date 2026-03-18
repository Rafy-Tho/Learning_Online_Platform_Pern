import { checkSchema } from "express-validator";
import {
  EnumValidator,
  numberValidator,
  textValidator,
} from "./common.validator.js";
import { CONTENT_STATUS, LESSON_TYPE } from "../constants/constants.js";

export const lessonValidator = checkSchema({
  name: textValidator("Name"),
  status: EnumValidator("Status", CONTENT_STATUS),
  description: textValidator("Description", true, 500),
  type: EnumValidator("Type", LESSON_TYPE),
  xpPoints: numberValidator("Xp point"),
  position: numberValidator("Position", true),
  durationMinutes: numberValidator("Durations"),
});
