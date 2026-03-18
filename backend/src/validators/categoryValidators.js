import { checkSchema } from "express-validator";
import { textValidator } from "./common.validator.js";

export const categoryValidator = checkSchema({
  name: textValidator("Category name"),
  slug: textValidator("Category slug"),
  description: textValidator("Category description", true, 500),
});
