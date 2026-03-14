import { checkSchema } from "express-validator";
import { longTextValidator, shortTextValidator } from "./common.validator.js";

export const categoryValidator = checkSchema({
  name: shortTextValidator("Category name"),
  slug: shortTextValidator("Category slug"),
  description: longTextValidator("Category description", true),
});
