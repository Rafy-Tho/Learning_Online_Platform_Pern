import StatusCode from "../constants/StatusCode.js";
import Course from "../repositories/CourseRepository.js";
import Enrollment from "../repositories/EnrollmentRepository.js";
import LearningProgress from "../repositories/LearningProgressRepository.js";
import Lesson from "../repositories/LessonRepository.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc Enroll a course
// @route POST /api/v1/courses/:id/enrollments
// @access Private
export const enrollCourse = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  const userId = req.session.user.id;
  // check if course exists
  const course = await Course.findById(courseId);
  if (!course)
    return next(new ApiError(StatusCode.NOT_FOUND, "Course not found"));
  // check if first lesson exists
  const firstLessonId = await Lesson.getFirstLesson(courseId);
  if (!firstLessonId)
    return next(new ApiError(StatusCode.NOT_FOUND, "First lesson not found"));
  // check if user is already enrolled in this course
  const enrollmented = await Enrollment.findOne({ courseId, userId });
  if (enrollmented)
    return next(
      new ApiError(
        StatusCode.BAD_REQUEST,
        "You are already enrolled in this course",
      ),
    );
  const enrollment = await Enrollment.enroll({
    courseId,
    userId,
    accessType: course.access_type,
  });
  await LearningProgress.create({
    courseId,
    userId,
    lessonId: firstLessonId.id,
  });

  res.status(200).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Course enrolled successfully",
    data: enrollment,
  });
});

// @desc Get enrollment of a course
// @route GET /api/v1/courses/:id/enrollments
// @access Private
export const getEnrollment = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  const userId = req.session.user.id;
  // check if course exists
  const course = await Course.findById(courseId);
  if (!course)
    return next(new ApiError(StatusCode.NOT_FOUND, "Course not found"));
  const enrollment = await Enrollment.findOne({ courseId, userId });
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Enrollment retrieved successfully",
    data: enrollment || null,
  });
});
