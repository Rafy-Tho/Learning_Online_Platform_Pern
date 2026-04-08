import StatusCode from "../constants/StatusCode.js";
import Answer from "../repositories/AnswerRepository.js";
import Question from "../repositories/QuestionRepository.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
// @desc Create an answer
// @route POST /api/v1/questions/:id/answers
// @access Private
export const createAnswer = asyncHandler(async (req, res, next) => {
  const questionId = req.params.id;
  const { text, isCorrect, position } = req.body;
  const question = await Question.findById({ questionId });
  if (!question)
    return next(new ApiError(StatusCode.NOT_FOUND, "Question not found"));
  const answer = await Answer.createAnswer({
    questionId,
    text,
    isCorrect,
    position,
  });
  res.status(StatusCode.CREATED).json({
    success: true,
    statusCode: StatusCode.CREATED,
    message: "Answer created successfully",
    data: answer,
  });
});
