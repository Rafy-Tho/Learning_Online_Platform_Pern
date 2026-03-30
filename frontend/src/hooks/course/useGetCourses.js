import { useQuery } from "@tanstack/react-query";
import courseApi from "../../services/CourseApi";
import parseQueryToObject from "../../utils/parseQueryToObject";
import parseQueryToString from "../../utils/parseQueryToString";

function useGetCourses(params) {
  const queryString = parseQueryToString(params);
  const queryObj = parseQueryToObject(params);
  const { data, isPending, error } = useQuery({
    queryKey: ["courses", queryObj],
    queryFn: () => courseApi.getCourses(queryString),
  });
  return { data, isPending, error };
}

export default useGetCourses;
