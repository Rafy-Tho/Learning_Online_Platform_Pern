import StatusCode from "../constants/StatusCode.js";
import CourseObjective from "../repositories/CourseObjectiveRepository.js";
import Course from "../repositories/CourseRepository.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
// @desc Create a new course objective
// @route POST /api/v1/courses/:id/objectives
//  @access Private/Instructor
export const createCourseObjective = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  const course = await Course.findById(courseId);
  const instructorId = req.session.user.id;
  const { content, position } = req.body;

  if (!course)
    return next(new ApiError(StatusCode.BAD_REQUEST, "Course  not found"));

  if (course.instructor_id !== instructorId)
    return next(
      new ApiError(StatusCode.FORBIDDEN, "You are not authorized to do this"),
    );

  const courseObjective = await CourseObjective.create({
    courseId,
    content,
    position,
  });

  res.status(StatusCode.CREATED).json({
    success: true,
    message: "Course objective created successfully",
    status: StatusCode.CREATED,
    data: courseObjective,
  });
});
// @desc Update a course objective
// @route PUT /api/v1/course-objectives/:id
// @access Private/Instructor
export const updateCourseObjective = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const instructorId = req.session.user.id;
  const { content, position } = req.body;
  const courseObjective = await CourseObjective.findById(id);

  if (!courseObjective)
    return next(
      new ApiError(StatusCode.BAD_REQUEST, "Course objective not found"),
    );

  if (courseObjective.course.instructorId !== instructorId)
    return next(
      new ApiError(StatusCode.FORBIDDEN, "You are not authorized to do this"),
    );

  const updatedCourseObjective = await CourseObjective.update({
    id,
    content,
    position,
  });

  res.status(StatusCode.OK).json({
    success: true,
    message: "Course objective updated successfully",
    status: StatusCode.OK,
    data: updatedCourseObjective,
  });
});
// @desc Get course objectives by course id
// @route GET /api/v1/courses/:id/objectives
// @access Public
export const getCourseObjectives = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  const course = await Course.findById(courseId);
  if (!course)
    return next(new ApiError(StatusCode.BAD_REQUEST, "Course  not found"));

  const courseObjectives = await CourseObjective.getByCourseId(courseId);
  res.status(StatusCode.OK).json({
    success: true,
    message: "Course objectives retrieved successfully",
    status: StatusCode.OK,
    data: courseObjectives,
  });
});
