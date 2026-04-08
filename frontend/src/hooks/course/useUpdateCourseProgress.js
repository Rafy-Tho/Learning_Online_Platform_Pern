import { toast } from "react-toastify";
import courseApi from "../../services/CourseApi";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function useUpdateCourseProgress() {
  const params = useParams();
  const courseId = params.courseId;
  const { mutate } = useMutation({
    mutationKey: ["update-course-progress", courseId],
    mutationFn: (data) => courseApi.updateCourseProgress(courseId, data),
    onError: (error) => {
      toast.error(error.message || "Failed to update course progress");
    },
  });
  return {
    mutate,
  };
}

export default useUpdateCourseProgress;
