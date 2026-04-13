class UserApi {
  constructor() {
    this.baseUrl = import.meta.env.VITE_BASE_URL + "/users";
  }
  async getMe() {
    const res = await fetch(`${this.baseUrl}/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch user profile");
    }
    return result;
  }
  async getProfile() {
    const res = await fetch(`${this.baseUrl}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch user profile");
    }
    return result;
  }
  async updateProfile(data) {
    const res = await fetch(`${this.baseUrl}/profile`, {
      method: "PATCH",
      body: data,
      credentials: "include",
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to update user profile");
    }
    return result;
  }
  async updateMe(data) {
    const res = await fetch(`${this.baseUrl}/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to update user profile");
    }
    return result;
  }
  async getXpEarned() {
    const res = await fetch(`${this.baseUrl}/xp-earned`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to get xp earned");
    }
    return result;
  }
  async createPayment(id) {
    const response = await fetch(`${this.baseUrl}/payment-stripe/${id}`, {
      method: "POST",
      credentials: "include",
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to create payment");
    }
    return result;
  }
}
const userApi = new UserApi();
export default userApi;
