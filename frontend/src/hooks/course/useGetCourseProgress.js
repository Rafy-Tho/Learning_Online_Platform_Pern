import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import courseApi from "../../services/CourseApi";
import { toast } from "react-toastify";

function useGetCourseProgress() {
  const params = useParams();
  const courseId = params.courseId;
  const { data } = useQuery({
    queryKey: ["course-progress", courseId],
    queryFn: () => courseApi.getCourseProgress(courseId),
    onError: (error) => {
      toast.error(error.message || "Failed to get course progress");
    },
  });
  return {
    data,
  };
}

export default useGetCourseProgress;
