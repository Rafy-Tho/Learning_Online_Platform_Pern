import { api } from "./client";

export const reviewsApi = {
  helpfulVote: ({ reviewId, isHelpful }) =>
    api.post(`/reviews/${reviewId}/helpful-votes`, { isHelpful }),
  report: ({ reviewId, reason, description }) =>
    api.post(`/reviews/${reviewId}/reports`, { reason, description }),
};
