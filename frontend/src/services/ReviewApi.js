class ReviewApi {
  constructor() {
    this.baseUrl = import.meta.env.VITE_BASE_URL + "/reviews";
  }

  // Create review helpful vote
  async helpfulVote({ reviewId, isHelpful }) {
    const response = await fetch(`${this.baseUrl}/${reviewId}/helpful-votes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        isHelpful: isHelpful,
      }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to create helpful vote");
    }
    return result;
  }

  // Create review report
  async report({ reviewId, reason, description }) {
    const response = await fetch(`${this.baseUrl}/${reviewId}/reports`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        reason: reason,
        description: description,
      }),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to create report");
    }
    return result;
  }
}

const reviewApi = new ReviewApi();

export default reviewApi;
