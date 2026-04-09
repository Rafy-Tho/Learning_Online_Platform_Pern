import { useQuery } from "@tanstack/react-query";
import courseApi from "../../services/CourseApi";

function useGetRecommendedCourse() {
  const { data, isPending, error } = useQuery({
    queryKey: ["recommended-course"],
    queryFn: async () => courseApi.getRecommendedCourses(),
  });
  return { data, isPending, error };
}

export default useGetRecommendedCourse;
