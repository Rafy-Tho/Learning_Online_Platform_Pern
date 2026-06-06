import { ADMIN } from "../constants/constants.js";
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
  const { id: instructorId, role } = req.session.user;
  const { question, explanation, position } = req.body;
  const lesson = await Lesson.findById(lessonId);
  if (!lesson)
    return next(new ApiError(StatusCode.NOT_FOUND, "Lesson not found"));
  // check if the user is the owner of the lesson or isAdmin
  const instructor = await Lesson.getInstructor(lessonId);

  if (instructor.instructor_id !== instructorId && role !== ADMIN)
    return next(
      new ApiError(StatusCode.FORBIDDEN, "You are not authorized to do this"),
    );

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
// @desc update a question
// @route PATCH /api/v1/questions/:id
// @access Private
export const updateQuestion = asyncHandler(async (req, res, next) => {
  const questionId = req.params.id;
  const { id: instructorId, role } = req.session.user;
  const { question, explanation, position } = req.body;

  const quiz = await Question.findById(questionId);
  if (!quiz)
    return next(new ApiError(StatusCode.NOT_FOUND, "Question not found"));
  // check if the user is the owner of the lesson or isAdmin
  const instructor = await Question.getInstructor(questionId);

  if (instructor.instructor_id !== instructorId && role !== ADMIN)
    return next(
      new ApiError(StatusCode.FORBIDDEN, "You are not authorized to do this"),
    );

  const result = await Question.updateQuestion({
    questionId,
    question,
    explanation,
    position,
  });

  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Question updated successfully",
    data: result,
  });
});
// @desc delete a question
// @route DELETE /api/v1/questions/:id
// @access Private
export const deleteQuestion = asyncHandler(async (req, res, next) => {
  const questionId = req.params.id;
  const { id: instructorId, role } = req.session.user;

  const quiz = await Question.findById(questionId);
  if (!quiz)
    return next(new ApiError(StatusCode.NOT_FOUND, "Question not found"));
  // check if the user is the owner of the lesson or isAdmin
  const instructor = await Question.getInstructor(questionId);

  if (instructor.instructor_id !== instructorId && role !== ADMIN)
    return next(
      new ApiError(StatusCode.FORBIDDEN, "You are not authorized to do this"),
    );

  const result = await Question.deleteQuestion(questionId);

  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Question deleted successfully",
    data: result,
  });
});
