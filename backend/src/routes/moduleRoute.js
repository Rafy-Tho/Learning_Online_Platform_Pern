import express from "express";
import { ADMIN, INSTRUCTOR } from "../constants/constants.js";
import {
  createModule,
  deleteModule,
  getModule,
  updateModule,
} from "../controllers/moduleControllers.js";
import authorize from "../middlewares/authorize.js";
import requireAuth from "../middlewares/requireAuth.js";
import { validateResult } from "../middlewares/validateResult.js";
import { moduleValidators } from "../validators/moduleValidators.js";
import chapterRoute from "./chapterRoute.js";

const moduleRoute = express.Router({ mergeParams: true });

moduleRoute.use("/:id/chapters", chapterRoute);
moduleRoute
  .route("/")
  .post(
    requireAuth,
    authorize(INSTRUCTOR, ADMIN),
    moduleValidators,
    validateResult,
    createModule,
  );

moduleRoute
  .route("/:id")
  .get(getModule)
  .patch(
    requireAuth,
    authorize(INSTRUCTOR, ADMIN),
    moduleValidators,
    validateResult,
    updateModule,
  )
  .delete(requireAuth, authorize(INSTRUCTOR, ADMIN), deleteModule);

export default moduleRoute;
