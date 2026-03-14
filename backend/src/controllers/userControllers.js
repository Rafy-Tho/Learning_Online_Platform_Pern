import ENV from "../configs/Env.js";
import StatusCode from "../constants/StatusCode.js";
import createRandomCode from "../helper/createRadomCode.js";
import Code from "../models/CodeModel.js";
import User from "../models/UserModel.js";
import emailService from "../services/EmailService.js";
import hashCode from "../services/HashCode.js";
import hashService from "../services/HashService.js";
import sessionService from "../services/SessionService.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
export const register = asyncHandler(async (req, res, next) => {
  const { email, password, name } = req.body;
  // check if user already exists
  const userExists = await User.findByEmail(email);
  if (userExists)
    return next(new ApiError(StatusCode.BAD_REQUEST, "User already exists"));
  // hash password
  const hashedPassword = await hashService.hash(password);
  // put default profile image
  const imageUrl = `${ENV.BASE_URL}/profile.jpg`;
  // create user
  const user = await User.create({
    email,
    password: hashedPassword,
    name,
    imageUrl,
  });
  // create user profile
  await User.createProfile(user.id);
  // find user with profile
  const userProfile = await User.profile(user.id);
  // create session
  await sessionService.create(req, user);
  // send response
  res.status(StatusCode.CREATED).json({
    success: true,
    statusCode: StatusCode.CREATED,
    message: "User registered successfully",
    data: userProfile,
  });
});
// @desc    Login a user
// @route   POST /api/users/login
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // check if user exists
  const user = await User.findByEmail(email);
  if (!user)
    return next(new ApiError(StatusCode.BAD_REQUEST, "Invalid credentials"));
  // verify password
  const isPasswordMatch = await hashService.verify(password, user.password);
  // check if password is valid
  if (!isPasswordMatch)
    return next(new ApiError(StatusCode.BAD_REQUEST, "Invalid credentials"));
  // find user with profile
  const userProfile = await User.profile(user.id);
  // create session
  await sessionService.create(req, user);
  // send response
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "User logged in successfully",
    data: userProfile,
  });
});
// @desc    Logout a user
// @route   POST /api/users/logout
// @access  Private
export const logout = asyncHandler(async (req, res, next) => {
  const userId = req.session.user.id;
  //  check if user exists
  const user = await User.findById(userId);
  if (!user)
    return next(new ApiError(StatusCode.NOT_FOUND, "User Doesn't Exist"));
  //  destroy session
  await sessionService.destroy(req);
  //  clear cookie
  res.clearCookie(ENV.COOKIE_NAME);
  //  send response
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "User logged out successfully",
  });
});
// @desc    Get user info
// @route   GET /api/users/me
// @access  Private
export const getProfile = asyncHandler(async (req, res, next) => {
  const userId = req.session.user.id;
  //  check if user exists
  const user = await User.profile(userId);
  if (!user) return next(new ApiError(StatusCode.NOT_FOUND, "User not found"));
  //  send response
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
export const updateProfile = asyncHandler(async (req, res, next) => {
  const userId = req.session.user.id;
  const {
    name,
    email,
    bio,
    headLine,
    youtubeUrl,
    twitterUrl,
    websiteUrl,
    linkedInUrl,
  } = req.body;
  //  check if user exists
  const user = await User.findById(userId);
  if (!user) return next(new ApiError(StatusCode.NOT_FOUND, "User not found"));
  //  update image url
  const imageUrl = req.file
    ? `${ENV.BASE_URL}/${req.file.filename}`
    : user.image_url;

  //  update user info
  await User.update(userId, {
    name: name || user.name,
    email: email || user.email,
    imageUrl,
  });
  //  update user profile

  await User.updateProfile(userId, {
    bio: bio || user.bio,
    headLine: headLine || user.headline,
    youtubeUrl: youtubeUrl || user.youtube_url,
    twitterUrl: twitterUrl || user.twitter_url,
    websiteUrl: websiteUrl || user.website_url,
    linkedInUrl: linkedInUrl || user.linkedin_url,
  });
  //  find user with profile
  const userProfile = await User.profile(userId);
  //  send response
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "User info updated successfully",
    data: userProfile,
  });
});

// @desc    Send password reset code
// @route   POST /api/users/password-reset-code
// @access  Public
export const sendPasswordResetCode = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  // check if user exists
  const user = await User.findByEmail(email);
  if (!user)
    return next(new ApiError(StatusCode.NOT_FOUND, "User Doesn't Exist"));
  // delete all previous codes
  await Code.delete(user.id);
  // 2. Generate 6-digit numeric code
  const code = createRandomCode();
  // 3. Set expiration time (e.g., 10 minutes from now)
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);
  //  hash code
  const hashedCode = hashCode(code);
  // save password reset code to user
  await Code.create(hashedCode, user.id, expiresAt);
  // send password reset code to user
  await emailService.sendResetCode(email, code);
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
  // check if user exists
  const user = await User.findByEmail(email);
  if (!user)
    return next(new ApiError(StatusCode.NOT_FOUND, "User Doesn't Exist"));
  // hash code
  const hashedCode = hashCode(code);
  // track attempt used
  const attempt = await Code.incrementAttempt(user.id);
  if (attempt > 5)
    return next(new ApiError(StatusCode.BAD_REQUEST, "Too many attempts"));
  // check if code exists
  const codeExist = await Code.findCode(hashedCode, user.id);
  if (!codeExist)
    return next(new ApiError(StatusCode.NOT_FOUND, "Code Doesn't Exist"));
  // check if code expired
  if (codeExist.expires_at < new Date())
    return next(new ApiError(StatusCode.BAD_REQUEST, "Code expired"));
  // hash password
  const passwordHash = await hashService.hash(password);
  // update user password
  await User.updatePassword(user.id, passwordHash);
  // delete codes
  await Code.delete(user.id);
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
  if (!user)
    return next(new ApiError(StatusCode.NOT_FOUND, "User Doesn't Exist"));
  // check if old password is correct
  const isMatch = await hashService.verify(oldPassword, user.password);
  if (!isMatch)
    return next(new ApiError(StatusCode.BAD_REQUEST, "Invalid credentials"));
  // hash new password
  const passwordHash = await hashService.hash(newPassword);
  // update user password
  await User.updatePassword(userId, passwordHash);
  // send response
  res.status(StatusCode.OK).json({
    message: "Password updated successfully",
  });
});
