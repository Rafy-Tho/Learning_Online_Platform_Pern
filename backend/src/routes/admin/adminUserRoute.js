import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../controllers/adminUserControllers.js";
import requireAuth from "../../middlewares/requireAuth.js";
import authorize from "../../middlewares/authorize.js";
import { ADMIN } from "../../constants/constants.js";

const adminUserRoute = express.Router();

adminUserRoute.use(requireAuth, authorize(ADMIN));

adminUserRoute.route("/").get(getUsers).post(createUser);
adminUserRoute.route("/:id").patch(updateUser).delete(deleteUser);

export default adminUserRoute;
