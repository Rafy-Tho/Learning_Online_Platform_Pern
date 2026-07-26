import bcrypt from "bcrypt";
import User from "../repositories/UserRepository.js";
import asyncHandler from "../utils/asyncHandler.js";
import StatusCode from "../constants/StatusCode.js";
import ApiError from "../utils/ApiError.js";

export const getUsers = asyncHandler(async (req, res, next) => {
  const { role, page, limit } = req.query;
  const users = await User.findAll({
    role,
    page: page ? parseInt(page) : 1,
    limit: limit ? parseInt(limit) : 20,
  });
  const total = await User.findAllCount(role);
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Users retrieved successfully",
    data: { users, total },
  });
});

export const createUser = asyncHandler(async (req, res, next) => {
  const { name, email, role, status } = req.body;
  if (!name || !email) {
    return next(
      new ApiError(StatusCode.BAD_REQUEST, "Name and email are required"),
    );
  }
  const existing = await User.findByEmail(email);
  if (existing) {
    return next(
      new ApiError(
        StatusCode.BAD_REQUEST,
        "User with this email already exists",
      ),
    );
  }
  const hashedPassword = await bcrypt.hash("TempPassword123!", 12);
  const defaultImageUrl = "https://res.cloudinary.com/dmuu7x5vm/image/upload/v1775903021/men_oquwmw.jpg";

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    imageUrl: defaultImageUrl,
  });

  // Update role and status if provided (create defaults to LEARNER/ACTIVE)
  if (role || status) {
    await User.updateById({
      id: user.id,
      name: user.name,
      email: user.email,
      role: role || user.role,
      status: status || user.status,
    });
  }

  await User.createProfile(user.id);
  res.status(StatusCode.CREATED).json({
    success: true,
    statusCode: StatusCode.CREATED,
    message: "User created successfully",
    data: user,
  });
});

export const updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, email, role, status } = req.body;
  const existing = await User.findById(id);
  if (!existing) {
    return next(new ApiError(StatusCode.NOT_FOUND, "User not found"));
  }
  const user = await User.updateById({
    id,
    name: name || existing.name,
    email: email || existing.email,
    role: role || existing.role,
    status: status || existing.status,
  });
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "User updated successfully",
    data: user,
  });
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const existing = await User.findById(id);
  if (!existing) {
    return next(new ApiError(StatusCode.NOT_FOUND, "User not found"));
  }
  await User.deleteById(id);
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "User deleted successfully",
    data: null,
  });
});
