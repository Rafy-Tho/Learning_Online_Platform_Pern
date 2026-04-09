import { useQuery } from "@tanstack/react-query";
import courseApi from "../../services/CourseApi";

function useGetCourseInProgress() {
  const { data, isPending, error } = useQuery({
    queryKey: ["course-in-progress"],
    queryFn: async () => courseApi.getCourseInProgress(),
  });
  return { data, isPending, error };
}

export default useGetCourseInProgress;
