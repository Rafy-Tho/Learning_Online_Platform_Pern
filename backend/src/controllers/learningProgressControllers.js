import StatusCode from "../constants/StatusCode.js";
import Course from "../repositories/CourseRepository.js";
import LearningProgress from "../repositories/LearningProgressRepository.js";
import Lesson from "../repositories/LessonRepository.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
// @desc Get learning progress of a course
// @route post /api/v1/courses/:id/progresses
export const learningProgress = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  const userId = req.session.user.id;
  const firstLessonId = await Lesson.getFirstLessonId(courseId);
  const lessonId = req.body.lessonId || firstLessonId;
  const course = await Course.findById({ courseId });
  if (!course) {
    return next(new ApiError(StatusCode.NOT_FOUND, "Course not found"));
  }
  let progress = await LearningProgress.findOne({ courseId, userId });
  if (!progress) {
    progress = await LearningProgress.create({ courseId, userId, lessonId });
  } else {
    progress = await LearningProgress.update({ courseId, userId, lessonId });
  }
  res.status(StatusCode.CREATED).json({
    success: true,
    statusCode: StatusCode.CREATED,
    message: "Learning progress updated successfully",
    data: progress,
  });
});
