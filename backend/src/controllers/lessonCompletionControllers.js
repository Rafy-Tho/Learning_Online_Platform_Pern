import StatusCode from "../constants/StatusCode.js";
import Course from "../repositories/CourseRepository.js";
import LessonCompletion from "../repositories/LessonCompletion.js";
import Lesson from "../repositories/LessonRepository.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc create lesson completion
// @route post /api/v1/lessons/:id/completions
// @access private
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
    timeSpentMinutes: lesson.duration_minutes,
    xpEarned: lesson.xp_points,
  });

  res.status(StatusCode.CREATED).json({
    success: true,
    statusCode: StatusCode.CREATED,
    message: "Lesson completion created successfully",
    data: completion,
  });
});
// @desc get all completed lesson IDs for a course
// @route get /api/v1/courses/:id/lesson-completions
// @access private
export const getCourseLessonCompletions = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  const userId = req.session.user.id;
  const completedIds = await LessonCompletion.getCourseCompletions(courseId, userId);
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Course lesson completions fetched successfully",
    data: completedIds,
  });
});
// @desc get lesson completion for a single lesson
// @route get /api/v1/lessons/:id/completions
// @access private
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
