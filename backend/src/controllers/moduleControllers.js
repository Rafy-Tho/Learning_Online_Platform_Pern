import { ADMIN } from "../constants/constants.js";
import StatusCode from "../constants/StatusCode.js";
import Course from "../repositories/CourseRepository.js";
import Module from "../repositories/ModuleRepository.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
// @desc Create a module
// @route POST /api/courses/:courseId/modules
// @access Private/Instructor
export const createModule = asyncHandler(async (req, res, next) => {
  const { name, description, position, status } = req.body;
  const courseId = req.params.id;
  const { id: instructorId, role } = req.session.user;
  // check if course exist
  const course = await Course.findById(courseId);
  if (!course)
    return next(new ApiError(StatusCode.NOT_FOUND, "Course not found"));
  //  check if the user is the owner of the course or isAdmin
  if (course.instructor_id !== instructorId && role !== ADMIN)
    return next(
      new ApiError(StatusCode.FORBIDDEN, "You are not authorized to do this"),
    );
  // create module
  const module = await Module.create({
    name,
    description,
    position,
    status,
    courseId,
  });

  res.status(201).json({
    success: true,
    statusCode: StatusCode.CREATED,
    message: "Module created successfully",
    data: module,
  });
});
// @desc Get modules by course id
// @route GET  /api/v1/modules/:id
// @access Private/Instructor
export const getModule = asyncHandler(async (req, res, next) => {
  const moduleId = req.params.id;
  const module = await Module.findById(moduleId);
  if (!module)
    return next(new ApiError(StatusCode.NOT_FOUND, "Module not found"));
  res.status(200).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Modules retrieved successfully",
    data: module,
  });
});
// @desc Update a module
// @route PATCH /api/v1/modules/:id
// @access Private/Instructor
export const updateModule = asyncHandler(async (req, res, next) => {
  const moduleId = req.params.id;
  const { id: instructorId, role } = req.session.user;
  const { name, description, position, iconName, status } = req.body;
  // check if module exist
  const module = await Module.findById(moduleId);
  if (!module)
    return next(new ApiError(StatusCode.NOT_FOUND, "Module not found"));
  // check if the user is the owner of the module or isAdmin
  const instructor = await Module.getInstructor(module.id);
  if (instructor.instructor_id !== instructorId && role !== ADMIN)
    return next(
      new ApiError(StatusCode.FORBIDDEN, "You are not authorized to do this"),
    );
  // update module
  await Module.update({
    id: moduleId,
    name,
    description,
    position,
    status,
  });

  res.status(200).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Module updated successfully",
    data: module,
  });
});
// @desc Delete a module
// @route DELETE /api/v1/modules/:id
// @access Private/Instructor
export const deleteModule = asyncHandler(async (req, res, next) => {
  const moduleId = req.params.id;
  const { id: instructorId, role } = req.session.user;
  // check if module exist
  const module = await Module.findById(moduleId);
  if (!module)
    return next(new ApiError(StatusCode.NOT_FOUND, "Module not found"));
  // check if the user is the owner of the module or isAdmin
  const instructor = await Module.getInstructor(module.id);
  if (instructor.instructor_id !== instructorId && role !== ADMIN)
    return next(
      new ApiError(StatusCode.FORBIDDEN, "You are not authorized to do this"),
    );
  // delete module
  await Module.delete(moduleId);
  res.status(200).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Module deleted successfully",
    data: module,
  });
});
