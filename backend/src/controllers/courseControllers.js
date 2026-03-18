import StatusCode from "../constants/StatusCode.js";
import Course from "../repositories/CourseRepository.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
// @desc Create a new course
// @route POST /api/v1/courses
// @access Private/Instructor
export const createCourse = asyncHandler(async (req, res, next) => {
  const instructorId = req.session.user.id;
  const { categoryId, name, slug, description, status, price, position } =
    req.body;
  const imageUrl = req?.file?.filename;
  if (!imageUrl)
    return next(new ApiError(StatusCode.BAD_REQUEST, "Image is required"));
  const courseData = {
    instructorId,
    categoryId,
    name,
    slug,
    description,
    imageUrl,
    status,
    price,
    position,
  };
  const course = await Course.create(courseData);
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
  const courses = await Course.findAll();
  res.status(200).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Courses retrieved successfully",
    data: courses,
  });
});
// @desc Get a course by ID
// @route GET /api/v1/courses/:id
// @access Public
export const getCourseById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  if (!course)
    return next(new ApiError(StatusCode.NOT_FOUND, "Course not found"));
  res.status(200).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Course retrieved successfully",
    data: course,
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
  const { categoryId, name, slug, description, status, price, position } =
    req.body;
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
  const imageUrl = req?.file?.filename || course.image_url;
  const courseData = {
    id,
    instructorId,
    categoryId,
    name,
    slug,
    description,
    status,
    price,
    position,
    imageUrl,
  };
  const updatedCourse = await Course.update(courseData);

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
