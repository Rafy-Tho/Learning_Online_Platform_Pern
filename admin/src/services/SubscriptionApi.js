class SubscriptionApi {
  constructor() {
    this.baseUrl = import.meta.env.VITE_BASE_URL + '/subscriptions';
  }

  async getSubscriptions() {
    const response = await fetch(`${this.baseUrl}`);

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch subscriptions');
    }
    return result;
  }

  async createSubscription(subscription) {
    const response = await fetch(`${this.baseUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to create subscription');
    }
    return result;
  }

  async updateSubscription(id, subscription) {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(subscription),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to update subscription');
    }
    return result;
  }

  async deleteSubscription(id) {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to delete subscription');
    }
    return result;
  }

  async getData() {
    const response = await fetch(`${this.baseUrl}/data`);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch data');
    }
    return result;
  }
}

const subscriptionApi = new SubscriptionApi();
export default subscriptionApi;
