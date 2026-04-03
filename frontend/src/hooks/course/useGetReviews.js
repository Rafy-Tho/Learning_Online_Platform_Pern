import { useQuery } from "@tanstack/react-query";
import courseApi from "../../services/CourseApi";
import parseQueryToString from "../../utils/parseQueryToString";
import parseQueryToObject from "../../utils/parseQueryToObject";
import { useParams } from "react-router-dom";

function useGetReviews(params) {
  const { courseId } = useParams();
  const queryString = parseQueryToString(params);
  const queryObject = parseQueryToObject(params);
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ["reviews", courseId, queryObject],
    queryFn: () => courseApi.getReviews(queryString, courseId),
  });
  return {
    data,
    isPending,
    error,
    refetch,
  };
}

export default useGetReviews;
