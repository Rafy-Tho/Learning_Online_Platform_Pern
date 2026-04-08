import StatusCode from "../constants/StatusCode.js";
import Course from "../repositories/CourseRepository.js";
import Enrollment from "../repositories/EnrollmentRepository.js";
import LearningProgress from "../repositories/LearningProgressRepository.js";
import Lesson from "../repositories/LessonRepository.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc Enroll a course
// @route POST /api/v1/courses/:id/enrolls
// @access Private
export const enrollCourse = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  const userId = req.session.user.id;
  const { accessType } = req.body;
  const course = await Course.findById(courseId);
  const firstLessonId = await Lesson.getFirstLessonId(courseId);
  if (!course)
    return next(new ApiError(StatusCode.NOT_FOUND, "Course not found"));
  let enrollment = await Enrollment.findOne({ courseId, userId });
  if (!enrollment) {
    enrollment = await Enrollment.enroll({
      courseId,
      userId,
      accessType,
    });
    await LearningProgress.create({
      courseId,
      userId,
      lessonId: firstLessonId,
    });
  }
  res.status(200).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Course enrolled successfully",
    data: enrollment,
  });
});
