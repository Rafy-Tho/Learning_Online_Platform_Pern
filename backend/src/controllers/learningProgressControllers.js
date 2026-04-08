import StatusCode from "../constants/StatusCode.js";
import Course from "../repositories/CourseRepository.js";
import LearningProgress from "../repositories/LearningProgressRepository.js";
import Lesson from "../repositories/LessonRepository.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
// @desc Get learning progress of a course
// @route post /api/v1/courses/:id/progresses
export const createLearningProgress = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  const userId = req.session.user.id;
  const firstLessonId = await Lesson.getFirstLesson(courseId);
  const course = await Course.findById(courseId);
  // check if course exists
  if (!course) {
    return next(new ApiError(StatusCode.NOT_FOUND, "Course not found"));
  }
  // check if lesson exists
  const lesson = await Lesson.findById(firstLessonId.id);
  if (!lesson) {
    return next(new ApiError(StatusCode.NOT_FOUND, "Lesson not found"));
  }
  // check if learning progress already exists
  const progressExists = await LearningProgress.findOne({ courseId, userId });
  if (progressExists) {
    return next(
      new ApiError(StatusCode.BAD_REQUEST, "Learning progress already exists"),
    );
  }

  const progress = await LearningProgress.create({
    courseId,
    userId,
    lessonId: firstLessonId.id,
  });

  res.status(StatusCode.CREATED).json({
    success: true,
    statusCode: StatusCode.CREATED,
    message: "Learning progress created successfully",
    data: progress,
  });
});

// @desc Update learning progress of a course
// @route patch /api/v1/courses/:id/progresses
export const updateLearningProgress = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  const userId = req.session.user.id;
  const lessonId = req.body.lessonId;
  // check if course exists
  const course = await Course.findById(courseId);
  if (!course) {
    return next(new ApiError(StatusCode.NOT_FOUND, "Course not found"));
  }
  // check if lesson exists
  const progress = await LearningProgress.findOne({ courseId, userId });
  if (!progress) {
    return next(
      new ApiError(StatusCode.NOT_FOUND, "Learning progress not found"),
    );
  }
  const updatedProgress = await LearningProgress.update({
    courseId,
    userId,
    lessonId,
  });
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Learning progress updated successfully",
    data: updatedProgress,
  });
});

// @desc Get learning progress of a course
// @route get /api/v1/courses/:id/progresses
export const getLearningProgress = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  const userId = req.session.user.id;
  // check if course exists
  const course = await Course.findById(courseId);
  if (!course) {
    return next(new ApiError(StatusCode.NOT_FOUND, "Course not found"));
  }
  const progress = await LearningProgress.findOne({ courseId, userId });

  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Learning progress retrieved successfully",
    data: progress ? progress : null,
  });
});
