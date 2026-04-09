import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import courseApi from "../../services/CourseApi";
import { toast } from "react-toastify";
import useAuth from "../useAuth";

function useGetCourseProgress() {
  const params = useParams();
  const courseId = params.courseId;
  const { user } = useAuth();
  const { data } = useQuery({
    queryKey: ["course-progress", courseId],
    queryFn: () => courseApi.getCourseProgress(courseId),
    onError: (error) => {
      toast.error(error.message || "Failed to get course progress");
    },
    enabled: !!courseId && !!user,
  });
  return {
    data,
  };
}

export default useGetCourseProgress;
