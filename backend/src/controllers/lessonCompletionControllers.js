import StatusCode from "../constants/StatusCode.js";
import Course from "../repositories/CourseRepository.js";
import LessonCompletion from "../repositories/LessonCompletion.js";
import Lesson from "../repositories/LessonRepository.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc create lesson completion
// @route post /api/v1/lessons/:id/completions
export const createLessonCompletion = asyncHandler(async (req, res, next) => {
  const lessonId = req.params.id;
  const userId = req.session.user.id;
  // check if lesson exists
  const courseId = await Course.getCourseIdByLessonId(lessonId);
  if (!courseId)
    return next(new ApiError(StatusCode.NOT_FOUND, "Course not found"));
  // check if lesson exists
  const lesson = await Lesson.findById(lessonId);
  if (!lesson) {
    return next(new ApiError(StatusCode.NOT_FOUND, "Lesson not found"));
  }
  const completion = await LessonCompletion.create({
    lessonId,
    userId,
    courseId,
    totalSpentMinutes: lesson.duration_minutes,
    xpEarned: lesson.xp_points,
  });

  res.status(StatusCode.CREATED).json({
    success: true,
    statusCode: StatusCode.CREATED,
    message: "Lesson completion created successfully",
    data: completion,
  });
});

export const getLessonCompletion = asyncHandler(async (req, res, next) => {
  const lessonId = req.params.id;
  const userId = req.session.user.id;
  // check if lesson exists
  const courseId = await Course.getCourseIdByLessonId(lessonId);
  if (!courseId)
    return next(new ApiError(StatusCode.NOT_FOUND, "Course not found"));
  // check if lesson exists
  const lesson = await Lesson.findById(lessonId);
  if (!lesson) {
    return next(new ApiError(StatusCode.NOT_FOUND, "Lesson not found"));
  }

  const completion = await LessonCompletion.getCompletion({
    lessonId,
    userId,
    courseId,
  });

  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Lesson completion fetched successfully",
    data: completion ? completion : null,
  });
});
