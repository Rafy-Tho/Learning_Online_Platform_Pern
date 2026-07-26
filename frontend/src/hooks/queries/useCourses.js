import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { coursesApi } from "../../api/courses";
import parseQueryToObject from "../../utils/parseQueryToObject";
import parseQueryToString from "../../utils/parseQueryToString";
import useAuth from "../useAuth";

export function useCourses(params) {
  const queryString = parseQueryToString(params);
  const queryObj = parseQueryToObject(params);
  return useQuery({
    queryKey: ["courses", queryObj],
    queryFn: () => coursesApi.getAll(queryString),
  });
}

export function useCourseDetails() {
  const { courseId } = useParams();
  return useQuery({
    queryKey: ["course-details", courseId],
    queryFn: () => coursesApi.getById(courseId),
    enabled: !!courseId,
  });
}

export function useCourseLearningData() {
  const { courseId } = useParams();
  return useQuery({
    queryKey: ["course-learning-data", courseId],
    queryFn: () => coursesApi.getLearningData(courseId),
    enabled: !!courseId,
  });
}

export function useCourseObjectives() {
  const { courseId } = useParams();
  return useQuery({
    queryKey: ["course-objectives", courseId],
    queryFn: () => coursesApi.getObjectives(courseId),
    enabled: !!courseId,
  });
}

export function useFirstLesson() {
  const { courseId } = useParams();
  return useQuery({
    queryKey: ["first-lesson", courseId],
    queryFn: () => coursesApi.getFirstLesson(courseId),
    enabled: !!courseId,
  });
}

export function useEnrollment() {
  const { courseId } = useParams();
  const { user } = useAuth();
  return useQuery({
    queryKey: ["enrolled", courseId],
    queryFn: () => coursesApi.getEnrollment(courseId),
    enabled: !!courseId && !!user,
  });
}

export function useCourseProgress() {
  const { courseId } = useParams();
  const { user } = useAuth();
  return useQuery({
    queryKey: ["course-progress", courseId],
    queryFn: () => coursesApi.getCourseProgress(courseId),
    enabled: !!courseId && !!user,
  });
}

export function useReviews(params) {
  const { courseId } = useParams();
  const queryString = parseQueryToString(params);
  const queryObject = parseQueryToObject(params);
  return useQuery({
    queryKey: ["reviews", courseId, queryObject],
    queryFn: () => coursesApi.getReviews(queryString, courseId),
    enabled: !!courseId,
  });
}

export function useInfiniteReviews(filters = {}) {
  const { courseId } = useParams();
  const limit = filters.limit || 5;

  return useInfiniteQuery({
    queryKey: ["reviews-infinite", courseId, filters],
    queryFn: ({ pageParam = 1 }) => {
      const params = new URLSearchParams();
      params.set("page", pageParam);
      params.set("limit", limit);
      if (filters.rating && filters.rating !== "All") params.set("rating", filters.rating);
      if (filters.search) params.set("search", filters.search);
      return coursesApi.getReviews(params.toString(), courseId);
    },
    getNextPageParam: (lastPage) => {
      const { pagination } = lastPage;
      if (pagination?.next) return pagination.next;
      return undefined;
    },
    initialPageParam: 1,
    enabled: !!courseId,
  });
}

export function useReviewDetails() {
  const { courseId } = useParams();
  return useQuery({
    queryKey: ["review-details", courseId],
    queryFn: () => coursesApi.getReviewDetails(courseId),
    enabled: !!courseId,
  });
}

export function useMyReview() {
  const { courseId } = useParams();
  return useQuery({
    queryKey: ["review-me"],
    queryFn: () => coursesApi.getReview(courseId),
    enabled: !!courseId,
  });
}

export function useRecentlyViewedCourses() {
  return useQuery({
    queryKey: ["get-recently-viewed-courses"],
    queryFn: () => coursesApi.getRecentlyViewed(),
  });
}

export function useRecommendedCourses() {
  return useQuery({
    queryKey: ["recommended-course"],
    queryFn: () => coursesApi.getRecommended(),
  });
}

export function usePopularCourses() {
  return useQuery({
    queryKey: ["popular-course"],
    queryFn: () => coursesApi.getPopular(),
  });
}

export function useCoursesInProgress() {
  return useQuery({
    queryKey: ["course-in-progress"],
    queryFn: () => coursesApi.getInProgress(),
  });
}

export function useCompletedCourses() {
  return useQuery({
    queryKey: ["completed-course"],
    queryFn: () => coursesApi.getCompleted(),
  });
}

export function useCertificate() {
  const { courseId } = useParams();
  return useQuery({
    queryKey: ["certificate", courseId],
    queryFn: () => coursesApi.getCertificate(courseId),
    enabled: !!courseId,
  });
}

export function useCertificateEligibility() {
  const { courseId } = useParams();
  return useQuery({
    queryKey: ["certificate-eligibility", courseId],
    queryFn: () => coursesApi.checkCertificateEligibility(courseId),
    enabled: !!courseId,
  });
}

export function useCourseLessonCompletions() {
  const { courseId } = useParams();
  const { user } = useAuth();
  return useQuery({
    queryKey: ["course-lesson-completions", courseId],
    queryFn: () => coursesApi.getCourseLessonCompletions(courseId),
    enabled: !!courseId && !!user,
  });
}

export function useMyCertificates() {
  return useQuery({
    queryKey: ["my-certificates"],
    queryFn: () => coursesApi.getMyCertificates(),
  });
}

export function useCertificateById(id) {
  return useQuery({
    queryKey: ["certificate", id],
    queryFn: () => coursesApi.getCertificateById(id),
    enabled: !!id,
  });
}
