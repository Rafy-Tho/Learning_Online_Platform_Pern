import StatusCode from "../constants/StatusCode.js";
import Chapter from "../repositories/ChapterRepository.js";
import Module from "../repositories/ModuleRepository.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc Create a chapter
// @route POST /api/v1/modules/:id/chapters
// @access Private/Instructor
export const createChapter = asyncHandler(async (req, res, next) => {
  const moduleId = req.params.id;
  const { name, description, position, status } = req.body;
  // Check if the course exists
  const module = await Module.findById(moduleId);
  if (!module)
    return next(new ApiError(StatusCode.NOT_FOUND, "Module not found"));
  // Create the chapter
  const chapter = await Chapter.create({
    moduleId,
    name,
    description,
    position,
    status,
  });
  // Send response
  res.status(201).json({
    success: true,
    statusCode: StatusCode.CREATED,
    message: "Chapter created successfully",
    data: chapter,
  });
});
// @desc Get chapters by module id
// @route GET /api/v1/modules/:id/chapters
// @access Private/Instructor
export const getChapters = asyncHandler(async (req, res, next) => {
  const moduleId = req.params.id;
  // Check if the module exists
  const module = await Module.findById(moduleId);
  if (!module)
    return next(new ApiError(StatusCode.NOT_FOUND, "Module not found"));
  // Get the chapters
  const chapters = await Chapter.find({ moduleId });
  // Send response
  res.status(200).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Chapters retrieved successfully",
    data: chapters,
  });
});
// @desc Update a chapter
// @route PATCH /api/v1/chapters/:id
// @access Private/Instructor
export const updateChapter = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, description, position, status } = req.body;
  // Check if the chapter exists
  const chapter = await Chapter.findById(id);
  if (!chapter)
    return next(new ApiError(StatusCode.NOT_FOUND, "Chapter not found"));
  // Update the chapter
  const updatedChapter = await Chapter.update({
    id,
    name,
    description,
    position,
    status,
  });
  // Send response
  res.status(200).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Chapter updated successfully",
    data: updatedChapter,
  });
});
// @desc Delete a chapter
// @route DELETE /api/v1/chapters/:id
// @access Private/Instructor
export const deleteChapter = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  // Check if the chapter exists
  const chapter = await Chapter.findById(id);
  if (!chapter)
    return next(new ApiError(StatusCode.NOT_FOUND, "Chapter not found"));
  // Delete the chapter
  await Chapter.delete(id);
  // Send response
  res.status(200).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Chapter deleted successfully",
  });
});
// @desc Get a chapter by id
// @route GET /api/v1/chapters/:id
// @access Private/Instructor
export const getChapter = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  // Check if the chapter exists
  const chapter = await Chapter.findById(id);
  if (!chapter)
    return next(new ApiError(StatusCode.NOT_FOUND, "Chapter not found"));
  // Send response
  res.status(200).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Chapter retrieved successfully",
    data: chapter,
  });
});
