import { useMutation } from "@tanstack/react-query";
import { reviewsApi } from "../../api/reviews";

export function useHelpfulVote() {
  return useMutation({
    mutationKey: ["helpful-vote"],
    mutationFn: ({ reviewId, isHelpful }) =>
      reviewsApi.helpfulVote({ reviewId, isHelpful }),
  });
}

export function useCreateReviewReport() {
  return useMutation({
    mutationKey: ["createReviewReport"],
    mutationFn: ({ reviewId, reason, description }) =>
      reviewsApi.report({ reviewId, reason, description }),
  });
}
