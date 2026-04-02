import { useQuery } from "@tanstack/react-query";
import courseApi from "../../services/CourseApi";
import { useParams } from "react-router-dom";

function useGetReviewDetails() {
  const { courseId } = useParams();
  console.log({ useGetReviewDetails: courseId });
  const { data, isPending, error } = useQuery({
    queryKey: ["review-details", courseId],
    queryFn: () => courseApi.getReviewDetails(courseId),
  });
  return {
    data,
    isPending,
    error,
  };
}

export default useGetReviewDetails;
