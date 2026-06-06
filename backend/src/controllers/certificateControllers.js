import StatusCode from "../constants/StatusCode.js";
import Certificate from "../repositories/CertificateRepository.js";
import Course from "../repositories/CourseRepository.js";
import Enrollment from "../repositories/EnrollmentRepository.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import ENV from "../configs/Env.js";

function generateCertificateNumber() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "CERT-";
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// @desc Claim a certificate for a completed course
// @route POST /api/v1/courses/:courseId/certificates
// @access Private
export const claimCertificate = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  const userId = req.session.user.id;

  const course = await Course.findById(courseId);
  if (!course) return next(new ApiError(StatusCode.NOT_FOUND, "Course not found"));

  const enrollment = await Enrollment.findOne({ courseId, userId });
  if (!enrollment) return next(new ApiError(StatusCode.BAD_REQUEST, "You are not enrolled in this course"));

  const existing = await Certificate.findByUserAndCourse({ userId, courseId });
  if (existing) {
    return res.status(StatusCode.OK).json({
      success: true,
      statusCode: StatusCode.OK,
      message: "Certificate already claimed",
      data: existing,
    });
  }

  const { isComplete } = await Certificate.checkCourseCompletion({ userId, courseId });
  if (!isComplete) {
    return next(new ApiError(StatusCode.BAD_REQUEST, "You have not completed all lessons in this course"));
  }

  const certificateNumber = generateCertificateNumber();

  const certificate = await Certificate.create({
    userId,
    courseId,
    certificateNumber,
    certificateUrl: `${ENV.CLIENT_URL_1}/certificates/{id}`,
  });

  certificate.certificate_url = `${ENV.CLIENT_URL_1}/certificates/${certificate.id}`;
  certificate.course_name = course.name;

  res.status(StatusCode.CREATED).json({
    success: true,
    statusCode: StatusCode.CREATED,
    message: "Certificate claimed successfully",
    data: certificate,
  });
});

// @desc Get certificate for a course (for current user)
// @route GET /api/v1/courses/:courseId/certificates
// @access Private
export const getCertificate = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  const userId = req.session.user.id;

  const certificate = await Certificate.findByUserAndCourse({ userId, courseId });

  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Certificate retrieved successfully",
    data: certificate || null,
  });
});

// @desc Get all certificates for current user
// @route GET /api/v1/certificates/mine
// @access Private
export const getMyCertificates = asyncHandler(async (req, res, next) => {
  const userId = req.session.user.id;
  const certificates = await Certificate.findByUser(userId);

  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Certificates retrieved successfully",
    data: certificates,
  });
});

// @desc Get certificate by ID (public view)
// @route GET /api/v1/certificates/:id
// @access Public
export const getCertificateById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const certificate = await Certificate.findById(id);

  if (!certificate) return next(new ApiError(StatusCode.NOT_FOUND, "Certificate not found"));

  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Certificate retrieved successfully",
    data: certificate,
  });
});

// @desc Check if user can claim certificate (completion status)
// @route GET /api/v1/courses/:courseId/certificates/check
// @access Private
export const checkCertificateEligibility = asyncHandler(async (req, res, next) => {
  const courseId = req.params.id;
  const userId = req.session.user.id;

  const course = await Course.findById(courseId);
  if (!course) return next(new ApiError(StatusCode.NOT_FOUND, "Course not found"));

  const existing = await Certificate.findByUserAndCourse({ userId, courseId });
  const { isComplete, total, completed } = await Certificate.checkCourseCompletion({ userId, courseId });

  res.status(StatusCode.OK).json({
    success: true,
    statusCode: StatusCode.OK,
    message: "Eligibility check completed",
    data: {
      isComplete,
      totalLessons: Number(total),
      completedLessons: Number(completed),
      hasCertificate: !!existing,
      certificate: existing || null,
    },
  });
});
