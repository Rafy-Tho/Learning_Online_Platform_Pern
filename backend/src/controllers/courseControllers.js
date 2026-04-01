import StatusCode from "../constants/StatusCode.js";
import Course from "../repositories/CourseRepository.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
// @desc Create a new course
// @route POST /api/v1/courses
// @access Private/Instructor
// eslint-disable-next-line no-unused-vars
export const createCourse = asyncHandler(async (req, res, next) => {
  const instructorId = req.session.user.id;
  const {
    categoryId,
    name,
    slug,
    description,
    status,
    position,
    level,
    accessType,
  } = req.body;

  const course = await Course.create({
    instructorId,
    categoryId,
    name,
    slug,
    description,
    status,
    position,
    level,
    accessType,
  });

  res.status(201).json({
    success: true,
    statusCode: StatusCode.CREATED,
    message: "Course created successfully",
    data: course,
  });
});
// @desc Get all courses
// @route GET /api/v1/courses
// @access Public
// eslint-disable-next-line no-unused-vars
export const getAllCourses = asyncHandler(async (req, res, next) => {
  const { data, pagination } = await Course.getAllCourses(req.query);
  const query = req.query;
  console.log(query);
  res.status(200).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Courses retrieved successfully",
    data: data,
    pagination,
    query,
  });
});
// @desc Get courses by category ID
// @route GET /api/v1/courses/category/:category_id
// @access Public
export const getCoursesByCategoryId = asyncHandler(async (req, res, next) => {
  const { category_id } = req.params;
  const courses = await Course.findByCategoryId(category_id);
  if (!courses.length)
    return next(
      new ApiError(StatusCode.NOT_FOUND, "No courses found for this category"),
    );
  res.status(200).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Courses retrieved successfully",
    data: courses,
  });
});
// @desc Get courses by instructor ID
// @route GET /api/v1/courses/instructor/:instructor_id
// @access Public
export const getCoursesByInstructorId = asyncHandler(async (req, res, next) => {
  const { instructor_id } = req.params;
  const courses = await Course.findByInstructorId(instructor_id);
  if (!courses.length)
    return next(
      new ApiError(
        StatusCode.NOT_FOUND,
        "No courses found for this instructor",
      ),
    );
  res.status(200).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Courses retrieved successfully",
    data: courses,
  });
});

export const updateCourse = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const instructorId = req.session.user.id;
  const {
    categoryId,
    name,
    slug,
    description,
    status,
    price,
    position,
    level,
    accessType,
  } = req.body;
  // Check if the course exists
  const course = await Course.findById(id);
  if (!course)
    return next(new ApiError(StatusCode.NOT_FOUND, "Course not found"));
  if (course.instructor_id !== instructorId)
    return next(
      new ApiError(
        StatusCode.FORBIDDEN,
        "You are not authorized to update this course",
      ),
    );
  // Update the course
  const updatedCourse = await Course.update({
    id,
    categoryId,
    name,
    slug,
    description,
    status,
    price,
    position,
    level,
    accessType,
  });

  res.status(200).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Course updated successfully",
    data: updatedCourse,
  });
});
// @desc Delete a course
// @route DELETE /api/v1/courses/:id
// @access Private/Instructor
export const deleteCourse = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const instructorId = req.session.user.id;
  // Check if the course exists
  const course = await Course.findById(id);
  if (!course)
    return next(new ApiError(StatusCode.NOT_FOUND, "Course not found"));
  if (course.instructor_id !== instructorId)
    return next(
      new ApiError(
        StatusCode.FORBIDDEN,
        "You are not authorized to delete this course",
      ),
    );
  const deletedCourse = await Course.delete(id);
  res.status(200).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Course deleted successfully",
    data: deletedCourse,
  });
});
// @desc Get specific course details
// @route GET /api/v1/courses/:id
// @access Public
export const getCourseDetails = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  if (!course)
    return next(new ApiError(StatusCode.NOT_FOUND, "Course not found"));
  const courseDetails = await Course.getCourseDetailsById(id);
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Course retrieved successfully",
    data: courseDetails,
  });
});
// @desc Get module details by course id
// @route GET /api/v1/courses/:id/modules
// @access Public
export const getCourseLearningData = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  if (!course)
    return next(new ApiError(StatusCode.NOT_FOUND, "Course not found"));

  const moduleDetails = await Course.getLearningData(id);

  res.status(200).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Module details retrieved successfully",
    data: moduleDetails,
  });
});
