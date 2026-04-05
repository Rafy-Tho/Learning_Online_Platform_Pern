import { checkSchema } from "express-validator";
import {
  booleanValidator,
  numberValidator,
  textValidator,
} from "./common.validator.js";

export const questionValidator = checkSchema({
  question: textValidator("Question", false, 500),
  explanation: textValidator("Explanation", false, 500),
  position: numberValidator("Position", false),
});

export const answerValidator = checkSchema({
  text: textValidator("Answer", false, 500),
  isCorrect: booleanValidator("Is Correct"),
  position: numberValidator("Position", false),
});
