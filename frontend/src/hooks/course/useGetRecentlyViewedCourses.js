import { useQuery } from "@tanstack/react-query";
import courseApi from "../../services/CourseApi";

function useGetRecentlyViewedCourses() {
  const { data, isPending, error } = useQuery({
    queryKey: ["get-recently-viewed-courses"],
    queryFn: () => courseApi.getRecentlyViewedCourses(),
  });
  return { data, isPending, error };
}

export default useGetRecentlyViewedCourses;
