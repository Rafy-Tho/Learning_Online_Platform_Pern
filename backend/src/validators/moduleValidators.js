import { checkSchema } from "express-validator";
import {
  EnumValidator,
  numberValidator,
  textValidator,
} from "./common.validator.js";
import { CONTENT_STATUS } from "../constants/constants.js";

export const moduleValidators = checkSchema({
  name: textValidator("Module name"),
  description: textValidator("Module description", true),
  position: numberValidator("Module position"),
  status: EnumValidator("Module status", CONTENT_STATUS),
});
