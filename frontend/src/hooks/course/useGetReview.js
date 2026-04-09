import { useQuery } from "@tanstack/react-query";
import courseApi from "../../services/CourseApi";
import { useParams } from "react-router-dom";

function useGetReview() {
  const { courseId } = useParams();
  const { data, isPending, isError } = useQuery({
    queryKey: ["review-me"],
    queryFn: () => courseApi.getReview(courseId),
    enabled: !!courseId,
  });
  return { data, isPending, isError };
}

export default useGetReview;
