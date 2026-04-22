import { ADMIN } from "../constants/constants.js";
import StatusCode from "../constants/StatusCode.js";
import LessonContent from "../repositories/LessonContentRepository.js";
import Lesson from "../repositories/LessonRepository.js";
import Subscription from "../repositories/SubscriptionRepository.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc Create a lesson content
// @route POST /api/v1/lessons/:id/contents
// @access Private
export const createLessonContent = asyncHandler(async (req, res, next) => {
  const lessonId = req.params.id;
  const { id: instructorId, role } = req.session.user;
  const { name, position, content } = req.body;
  // check if lesson exist
  const lesson = await Lesson.findById(lessonId);
  if (!lesson)
    return next(new ApiError(StatusCode.NOT_FOUND, "Lesson not found"));
  // check if the user is the owner of the lesson or isAdmin
  const instructor = Lesson.getInstructor(lessonId);
  if (instructor.instructor_id !== instructorId && role !== ADMIN)
    return next(
      new ApiError(StatusCode.FORBIDDEN, "You are not authorized to do this"),
    );
  const lessonContent = await LessonContent.create({
    lessonId,
    name,
    position,
    content,
  });
  res.status(StatusCode.CREATED).json({
    success: true,
    statusCode: StatusCode.CREATED,
    message: "Lesson content created successfully",
    data: lessonContent,
  });
});
// @desc Update a lesson content
// @route PATCH /api/v1/contents/:id
// @access Private/Instructor
export const updateLessonContent = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { id: instructorId, role } = req.session.user;
  const { name, position, content } = req.body;
  const lessonContent = await LessonContent.findById(id);
  if (!lessonContent)
    return next(new ApiError(StatusCode.NOT_FOUND, "Lesson content not found"));
  // check if the user is the owner of the lesson or isAdmin
  const instructor = LessonContent.getInstructor(id);
  if (instructor.instructor_id !== instructorId && role !== ADMIN)
    return next(
      new ApiError(StatusCode.FORBIDDEN, "You are not authorized to do this"),
    );
  const updatedLessonContent = await LessonContent.update({
    id,
    name,
    position,
    content,
  });
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Lesson content updated successfully",
    data: updatedLessonContent,
  });
});
// @desc Delete a lesson content
// @route DELETE /api/v1/contents/:id
// @access Private/Instructor
export const deleteLessonContent = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { id: instructorId, role } = req.session.user;

  const lessonContent = await LessonContent.findById(id);
  if (!lessonContent)
    return next(new ApiError(StatusCode.NOT_FOUND, "Lesson content not found"));
  // check if the user is the owner of the lesson or isAdmin
  const instructor = LessonContent.getInstructor(id);
  if (instructor.instructor_id !== instructorId && role !== ADMIN)
    return next(
      new ApiError(StatusCode.FORBIDDEN, "You are not authorized to do this"),
    );
  const deleteContent = await LessonContent.delete(id);

  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Lesson content delete successfully",
    data: deleteContent,
  });
});

// @desc Create a lesson content
// @route get GET /api/v1/lessons/:id/contents
// @access public
export const getLessonContents = asyncHandler(async (req, res, next) => {
  const userId = req.session.user.id;
  const lessonId = req.params.id;
  const lesson = await Lesson.findById(lessonId);
  if (!lesson)
    return next(new ApiError(StatusCode.NOT_FOUND, "Lesson not found"));
  if (lesson.access_type === "SUBSCRIPTION") {
    const activePlan = await Subscription.getActivePaidSubscription(userId);
    if (!activePlan)
      return next(
        new ApiError(
          StatusCode.FORBIDDEN,
          "You don't have a paid subscription",
        ),
      );
  }
  const lessonContents = await LessonContent.findByLessonId(lessonId);
  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Lesson contents fetched successfully",
    data: lessonContents,
  });
});
