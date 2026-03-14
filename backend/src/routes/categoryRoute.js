import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/categoryControllers.js";
import requireAuth from "../middlewares/requireAuth.js";
import authorize from "../middlewares/authorize.js";
import { ADMIN } from "../constants/constants.js";
import { categoryValidator } from "../validators/categoryValidators.js";
import { validateResult } from "../middlewares/validateResult.js";

const categoryRoute = express.Router();

categoryRoute
  .route("/")
  .get(getAllCategories)
  .post(
    requireAuth,
    authorize(ADMIN),
    categoryValidator,
    validateResult,
    createCategory,
  );
categoryRoute
  .route("/:id")
  .get(getCategoryById)
  .patch(
    requireAuth,
    authorize(ADMIN),
    categoryValidator,
    validateResult,
    updateCategory,
  )
  .delete(requireAuth, authorize(ADMIN), deleteCategory);

export default categoryRoute;
