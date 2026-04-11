import StatusCode from "../constants/StatusCode.js";
import Lesson from "../repositories/LessonRepository.js";
import Question from "../repositories/QuestionRepository.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
// @desc Create a question
// @route POST /api/v1/lessons/:id/questions
// @access Private
export const createQuestion = asyncHandler(async (req, res, next) => {
  const lessonId = req.params.id;
  const { question, explanation, position } = req.body;
  const lesson = await Lesson.findById(lessonId);
  if (!lesson)
    return next(new ApiError(StatusCode.NOT_FOUND, "Lesson not found"));
  const result = await Question.createQuestion({
    lessonId,
    question,
    explanation,
    position,
  });
  res.status(StatusCode.CREATED).json({
    success: true,
    statusCode: StatusCode.CREATED,
    message: "Question created successfully",
    data: result,
  });
});
