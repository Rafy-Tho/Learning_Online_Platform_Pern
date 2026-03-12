import ENV from "../configs/Env.js";
import StatusCode from "../constants/StatusCode.js";
import passwordHelper from "../helper/passwordHelper.js";
import sessionManager from "../helper/sessionManager.js";
import Code from "../models/CodeModel.js";
import User from "../models/UserModel.js";
import { sendEmail } from "../services/sendEmail.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const register = asyncHandler(async (req, res, next) => {
  const { email, password, name } = req.body;

  const userExists = await User.findUserByEmail({ email });

  if (userExists)
    return next(new ApiError(StatusCode.BAD_REQUEST, "User already exists"));

  const hashedPassword = await passwordHelper.hashPassword(password);
  const imageUrl = `${ENV.BASE_URL}/profile.jpg`;

  const user = await User.createUser({
    email,
    password: hashedPassword,
    name,
    imageUrl,
  });

  await User.createProfile(user.id, { imageUrl });

  const AllUserInfo = await User.getAllInfo(user.id);

  await sessionManager.createSession(req, user);

  AllUserInfo.password = undefined;

  res.status(StatusCode.CREATED).json({
    success: true,
    statusCode: StatusCode.CREATED,
    message: "User registered successfully",
    data: AllUserInfo,
  });
});
// @desc    Login a user
// @route   POST /api/users/login
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findUserByEmail({ email });

  if (!user)
    return next(new ApiError(StatusCode.BAD_REQUEST, "Invalid credentials"));

  const isPasswordMatch = await passwordHelper.comparePassword(
    password,
    user.password,
  );

  if (!isPasswordMatch)
    return next(new ApiError(StatusCode.BAD_REQUEST, "Invalid credentials"));
  const AllUserInfo = await User.getAllInfo(user.id);

  await sessionManager.createSession(req, user);

  AllUserInfo.password = undefined;

  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "User logged in successfully",
    data: AllUserInfo,
  });
});
// @desc    Logout a user
// @route   POST /api/users/logout
// @access  Public
export const logout = asyncHandler(async (req, res, next) => {
  const userId = req.session.user.id;

  const user = await User.getAllInfo(userId);

  if (!user) return next(new ApiError(StatusCode.NOT_FOUND, "User not found"));

  await sessionManager.destroySession(req);

  res.clearCookie(ENV.COOKIE_NAME);

  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "User logged out successfully",
  });
});
// @desc    Get user info
// @route   GET /api/users/my-info
// @access  Private
export const getUserInfo = asyncHandler(async (req, res, next) => {
  const userId = req.session.user.id;

  const user = await User.getAllInfo(userId);

  if (!user) return next(new ApiError(StatusCode.NOT_FOUND, "User not found"));

  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "User info retrieved successfully",
    data: user,
  });
});
// @desc    Update user info
// @route   PATCH /api/users/update-info
// @access  Private
export const updateUserInfo = asyncHandler(async (req, res, next) => {
  const userId = req.session.user.id;

  const { name, email, bio, headLine, youtubeUrl, twitterUrl, websiteUrl } =
    req.body;

  const imageUrl = req.file
    ? `${ENV.BASE_URL}/${req.file.filename}`
    : `${ENV.BASE_URL}/profile.jpg`;

  const user = await User.updateInfo(userId, {
    name,
    email,
    imageUrl,
  });

  if (!user) return next(new ApiError(StatusCode.NOT_FOUND, "User not found"));

  await User.updateProfile(userId, {
    bio,
    headLine,
    youtubeUrl,
    twitterUrl,
    websiteUrl,
  });

  const userInfo = await User.getAllInfo(userId);

  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "User info updated successfully",
    data: userInfo,
  });
});

// @desc    Send password reset code
// @route   POST /api/users/password-reset-code
// @access  Public
export const sendPasswordResetCode = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  // check if user exists
  const user = await User.findUserByEmail({ email });
  if (!user) return next(new ApiError(StatusCode.NOT_FOUND, "User not found"));

  // 2. Generate 6-digit numeric code
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // save password reset code to user
  await Code.addCode(code, user.id, expiresAt);

  // send password reset code to user
  await sendEmail(email, "Password Reset Code", code);

  // send response
  res.status(200).json({
    message: "Password reset code sent successfully",
  });
});
// @desc    Reset password
// @route   POST /api/users/reset-password
// @access  Public
export const resetPassword = asyncHandler(async (req, res, next) => {
  const { email, code, password } = req.body;

  const user = await User.findUserByEmail({ email });
  if (!user) return next(new ApiError(StatusCode.NOT_FOUND, "User not found"));
  // check if code exists
  const codeRecord = await Code.verifyCode(code, user.id);

  if (!codeRecord)
    return next(new ApiError(StatusCode.NOT_FOUND, "Code not found"));

  if (codeRecord.expires_at < new Date())
    return next(new ApiError(StatusCode.BAD_REQUEST, "Code expired"));

  // hash password
  const passwordHash = await passwordHelper.hashPassword(password);

  // update user password
  await User.updatePassword(user.id, passwordHash);

  // delete code
  await Code.deleteCode(code, user.id);

  // send response
  res.status(StatusCode.OK).json({
    message: "Password reset successfully",
  });
});
// @desc    Update password
// @route   POST /api/users/update-password
// @access  Private
export const updatePassword = asyncHandler(async (req, res, next) => {
  const userId = req.session.user.id;
  const { oldPassword, newPassword } = req.body;
  // check if user exists
  const user = await User.findById(userId);
  if (!user) return next(new ApiError(StatusCode.NOT_FOUND, "User not found"));
  // check if old password is correct
  const isMatch = await passwordHelper.comparePassword(
    oldPassword,
    user.password,
  );
  if (!isMatch)
    return next(new ApiError(StatusCode.BAD_REQUEST, "Invalid credentials"));
  // hash new password
  const passwordHash = await passwordHelper.hashPassword(newPassword);
  // update user password
  await User.updatePassword(userId, passwordHash);
  // send response
  res.status(StatusCode.OK).json({
    message: "Password updated successfully",
  });
});
