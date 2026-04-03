import { useMutation } from "@tanstack/react-query";
import reviewApi from "../../services/ReviewApi";

function useHelpfulVote() {
  const { mutate, isPending, error } = useMutation({
    mutationKey: ["helpful-vote"],
    mutationFn: ({ reviewId, isHelpful }) =>
      reviewApi.helpfulVote({ reviewId, isHelpful }),
  });
  return {
    mutate,
    isPending,
    error,
  };
}

export default useHelpfulVote;
