import { useQuery } from "@tanstack/react-query";
import courseApi from "../../services/CourseApi";

function useGetCompletedCourse() {
  const { data, isPending, error } = useQuery({
    queryKey: ["completed-course"],
    queryFn: () => courseApi.getCompletedCourse(),
  });
  return { data, isPending, error };
}

export default useGetCompletedCourse;
