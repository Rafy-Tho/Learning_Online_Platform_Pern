import { useQuery } from "@tanstack/react-query";
import courseApi from "../../services/CourseApi";

function useGetPopularCourse() {
  const { data, isPending, error } = useQuery({
    queryKey: ["popular-course"],
    queryFn: async () => courseApi.getPopularCourses(),
  });
  return { data, isPending, error };
}

export default useGetPopularCourse;
