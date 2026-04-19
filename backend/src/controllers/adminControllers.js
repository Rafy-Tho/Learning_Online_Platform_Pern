import StatusCode from "../constants/StatusCode.js";
import Course from "../repositories/CourseRepository.js";
import Enrollment from "../repositories/EnrollmentRepository.js";
import User from "../repositories/UserRepository.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
// @desc Get dashboard data
// @route GET /api/admin/dashboard
// @access Private
export const getDashboardData = asyncHandler(async (req, res, next) => {
  const userId = req.session.user.id;

  const user = await User.findById(userId);
  if (!user) return next(new ApiError(StatusCode.NOT_FOUND, "User not found"));

  const [
    totalCourses,
    totalInstructors,
    totalStudents,
    totalEnrollments,
    courses,
    instructors,
  ] = await Promise.all([
    Course.getTotalCourse(),
    User.getTotalInstructors(),
    User.getTotalStudents(),
    Enrollment.getTotalEnrollments(),
    Course.getRecentCourses(),
    User.getInstructors(),
  ]);

  res.status(StatusCode.OK).json({
    statusCode: StatusCode.OK,
    success: true,
    message: "Dashboard data retrieved successfully",
    data: {
      totalCourses,
      totalInstructors,
      totalStudents,
      totalEnrollments,
      courses,
      instructors,
    },
  });
});
