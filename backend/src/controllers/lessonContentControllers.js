import StatusCode from "../constants/StatusCode.js";
import LessonContent from "../repositories/LessonContentRepository.js";
import Lesson from "../repositories/LessonRepository.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc Create a lesson content
// @route POST /api/v1/lessons/:id/contents
// @access Private
export const createLessonContent = asyncHandler(async (req, res, next) => {
  const lessonId = req.params.id;
  const { name, position, content } = req.body;

  const lesson = await Lesson.findById(lessonId);
  if (!lesson)
    return next(new ApiError(StatusCode.NOT_FOUND, "Lesson not found"));
  const lessonContent = await LessonContent.create({
    lessonId,
    name,
    position,
    content,
  });
  res.status(StatusCode.CREATED).json({
    success: true,
    statusCode: StatusCode.CREATED,
    message: "Lesson content created successfully",
    data: lessonContent,
  });
});
// @desc Update a lesson content
// @route PATCH /api/v1/contents/:id
// @access Private/Instructor
export const updateLessonContent = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, position, content } = req.body;
  const lessonContent = await LessonContent.findById(id);
  if (!lessonContent)
    return next(new ApiError(StatusCode.NOT_FOUND, "Lesson content not found"));
  const updatedLessonContent = await LessonContent.update({
    id,
    name,
    position,
    content,
  });
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Lesson content updated successfully",
    data: updatedLessonContent,
  });
});
