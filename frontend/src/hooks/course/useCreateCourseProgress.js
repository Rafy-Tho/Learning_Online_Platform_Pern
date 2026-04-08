import { toast } from "react-toastify";
import courseApi from "../../services/CourseApi";
import { useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function useCreateCourseProgress() {
  const params = useParams();
  const courseId = params.courseId;
  const { mutate } = useMutation({
    mutationKey: ["create-course-progress", courseId],
    mutationFn: () => courseApi.createCourseProgress(courseId),
    onError: (error) => {
      toast.error(error.message || "Failed to create course progress");
    },
  });
  return {
    mutate,
  };
}

export default useCreateCourseProgress;
