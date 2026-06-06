import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import courseApi from "../../services/CourseApi";
import useAuth from "../useAuth";

function useGetCourseProgress() {
  const params = useParams();
  const courseId = params.courseId;
  const { user } = useAuth();
  const { data, isPending } = useQuery({
    queryKey: ["course-progress", courseId],
    queryFn: () => courseApi.getCourseProgress(courseId),
    enabled: !!courseId && !!user,
  });
  return {
    data,
    isPending,
  };
}

export default useGetCourseProgress;
