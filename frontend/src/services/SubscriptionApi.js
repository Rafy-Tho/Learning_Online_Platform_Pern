class SubscriptionApi {
  constructor() {
    this.baseUrl = import.meta.env.VITE_BASE_URL + "/subscriptions";
  }

  async getSubscription(subscriptionId) {
    const res = await fetch(`${this.baseUrl}/${subscriptionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch subscription");
    }
    return result;
  }
  async getActiveSubscription() {
    const res = await fetch(`${this.baseUrl}/user-active`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch active subscriptions");
    }
    return result;
  }
}
export const subscriptionApi = new SubscriptionApi();
