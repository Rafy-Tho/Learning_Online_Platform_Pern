import StatusCode from "../constants/StatusCode.js";
import Course from "../repositories/CourseRepository.js";
import LessonCompletion from "../repositories/LessonCompletion.js";
import Lesson from "../repositories/LessonRepository.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc Update lesson completion
// @route post /api/v1/lessons/:id/completions
export const lessonCompletion = asyncHandler(async (req, res, next) => {
  const lessonId = req.body.lessonId;
  const userId = req.session.user.id;
  const courseId = req.body.courseId;
  const course = await Course.findById({ courseId });
  if (!course) {
    return next(new ApiError(StatusCode.NOT_FOUND, "Course not found"));
  }
  const lesson = await Lesson.findById({ lessonId });
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
