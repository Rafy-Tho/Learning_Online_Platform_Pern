import StatusCode from "../constants/StatusCode.js";
import Chapter from "../repositories/ChapterRepository.js";
import Course from "../repositories/CourseRepository.js";
import Lesson from "../repositories/LessonRepository.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc Create a new lesson
// @route POST /api/v1/chapters/:id/lessons
// @access Private
export const createLesson = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const {
    name,
    description,
    status,
    xpPoints,
    durationMinutes,
    position,
    accessType,
    type,
  } = req.body;
  const chapter = await Chapter.findById(id);
  if (!chapter)
    return next(new ApiError(StatusCode.NOT_FOUND, "Chapter not found"));
  const lesson = await Lesson.create({
    name,
    description,
    status,
    xpPoints,
    durationMinutes,
    position,
    type,
    chapterId: id,
    accessType,
  });
  res.status(StatusCode.CREATED).json({
    success: true,
    statusCode: StatusCode.CREATED,
    message: "Lesson created successfully",
    data: lesson,
  });
});
// @desc Update a lesson
// @route PUT /api/v1/lessons/:id
// @access Private
export const updateLesson = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    description,
    status,
    xpPoints,
    durationMinutes,
    position,
    type,
  } = req.body;
  const lesson = await Lesson.findById(id);
  if (!lesson)
    return next(new ApiError(StatusCode.NOT_FOUND, "Lesson not found"));
  const updatedLesson = await Lesson.update({
    id,
    name,
    description,
    status,
    xpPoints,
    durationMinutes,
    position,
    type,
  });
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Lesson updated successfully",
    data: updatedLesson,
  });
});
// @desc Delete a lesson
// @route DELETE /api/v1/lessons/:id
// @access Private
export const deleteLesson = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const lesson = await Lesson.findById(id);
  if (!lesson)
    return next(new ApiError(StatusCode.NOT_FOUND, "Lesson not found"));
  await Lesson.delete(id);
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Lesson deleted successfully",
  });
});

// @desc Get first lesson ID for a course
// @route GET /api/v1/courses/:id/first-lesson
// @access Public
export const getFirstLesson = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  if (!course)
    return next(new ApiError(StatusCode.NOT_FOUND, "Course not found"));

  const firstLesson = await Lesson.getFirstLesson(id);
  if (!firstLesson)
    return next(new ApiError(StatusCode.NOT_FOUND, "First lesson not found"));
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "First lesson retrieved successfully",
    data: firstLesson,
  });
});
// @desc Get questions for a lesson
// @route GET /api/v1/lessons/:id/questions
// @access Public
export const getQuestions = asyncHandler(async (req, res, next) => {
  const lessonId = req.params.id;
  const lesson = await Lesson.findById(lessonId);
  if (!lesson)
    return next(new ApiError(StatusCode.NOT_FOUND, "Lesson not found"));
  const questions = await Lesson.getQuestions(lessonId);
  if (!questions)
    return next(new ApiError(StatusCode.NOT_FOUND, "Questions not found"));
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Questions retrieved successfully",
    data: questions,
  });
});
