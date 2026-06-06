import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { coursesApi } from "../../api/courses";
import { lessonsApi } from "../../api/lessons";
import { toast } from "react-toastify";

export function useEnrollCourse() {
  const { courseId } = useParams();
  return useMutation({
    mutationKey: ["enroll-course", courseId],
    mutationFn: () => coursesApi.enrollCourse(courseId),
    onError: (error) => {
      toast.error(error.message || "Enrollment failed");
    },
  });
}

export function useCreateCourseProgress() {
  const { courseId } = useParams();
  return useMutation({
    mutationKey: ["create-course-progress", courseId],
    mutationFn: () => coursesApi.createCourseProgress(courseId),
    onError: (error) => {
      toast.error(error.message || "Failed to create course progress");
    },
  });
}

export function useUpdateCourseProgress() {
  const { courseId } = useParams();
  return useMutation({
    mutationKey: ["update-course-progress", courseId],
    mutationFn: (data) => coursesApi.updateCourseProgress(courseId, data),
    onError: (error) => {
      toast.error(error.message || "Failed to update course progress");
    },
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["createReview"],
    mutationFn: (data) => coursesApi.createReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["review-me"] });
    },
  });
}

export function useClaimCertificate() {
  const { courseId } = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["claim-certificate", courseId],
    mutationFn: () => coursesApi.claimCertificate(courseId),
    onSuccess: () => {
      toast.success("Certificate claimed successfully!");
      queryClient.invalidateQueries({ queryKey: ["certificate", courseId] });
      queryClient.invalidateQueries({ queryKey: ["certificate-eligibility", courseId] });
      queryClient.invalidateQueries({ queryKey: ["my-certificates"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to claim certificate");
    },
  });
}

export function useCreateCompletedLesson() {
  const { lessonId } = useParams();
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-completed-lesson", lessonId],
    mutationFn: () => lessonsApi.completeLesson(lessonId),
    onError: (error) => {
      toast.error(error.message || "Failed to complete lesson");
    },
    onSuccess: () => {
      toast.success("Lesson completed successfully");
      queryClient.invalidateQueries({ queryKey: ["get-completed-lesson", lessonId] });
    },
  });
}
