import { useQuery } from "@tanstack/react-query";
import courseApi from "../../services/CourseApi";
import { useParams } from "react-router-dom";

function useGetCourseObjective() {
  const params = useParams();
  const courseId = params.courseId;
  const { data, isPending, error } = useQuery({
    queryKey: ["course-objective", courseId],
    queryFn: async () => courseApi.getCourseObjectives(courseId),
  });
  return { data, isPending, error };
}

export default useGetCourseObjective;
