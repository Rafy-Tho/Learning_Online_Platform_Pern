import StatusCode from "../constants/StatusCode.js";
import Category from "../repositories/CategoryRepository.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc    Create a new category
// @route   POST /api/categories
// @access  Private/Admin
// eslint-disable-next-line no-unused-vars
export const createCategory = asyncHandler(async (req, res, next) => {
  const { name, slug, description } = req.body;
  const category = await Category.create({
    name,
    slug,
    description,
  });
  res.status(StatusCode.CREATED).json({
    success: true,
    statusCode: StatusCode.CREATED,
    message: "Category created successfully",
    data: category,
  });
});
// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
// eslint-disable-next-line no-unused-vars
export const getAllCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.findAll();
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Categories retrieved successfully",
    data: categories,
  });
});
// @desc    Get category by id
// @route   GET /api/categories/:id
// @access  Public
export const getCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return next(new ApiError(StatusCode.NOT_FOUND, "Category not found"));
  }
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Category retrieved successfully",
    data: category,
  });
});
// @desc    Update category by id
// @route    PATCH /api/categories/:id
// @access  Private/Admin
export const updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, slug, description } = req.body;
  const category = await Category.findById(id);
  if (!category) {
    return next(new ApiError(StatusCode.NOT_FOUND, "Category not found"));
  }
  await Category.update({
    categoryId: id,
    name: name || category.name,
    slug: slug || category.slug,
    description: description || category.description,
  });
  const updatedCategory = await Category.findById(id);
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Category updated successfully",
    data: updatedCategory,
  });
});
// @desc    Delete category by id
// @route   DELETE /api/categories/:id
// @access  Private/Admin
export const deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return next(new ApiError(StatusCode.NOT_FOUND, "Category not found"));
  }
  await Category.delete(id);
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Category deleted successfully",
  });
});
