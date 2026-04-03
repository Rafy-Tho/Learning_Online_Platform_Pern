import { useMutation } from "@tanstack/react-query";
import reviewApi from "../../services/ReviewApi";

function useCreateReviewReport() {
  const { mutate, isPending, error } = useMutation({
    mutationKey: ["createReviewReport"],
    mutationFn: ({ reviewId, reason, description }) =>
      reviewApi.report({ reviewId, reason, description }),
  });
  return {
    mutate,
    isPending,
    error,
  };
}

export default useCreateReviewReport;
