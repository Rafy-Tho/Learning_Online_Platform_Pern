class UserApi {
  constructor() {
    this.baseUrl = import.meta.env.VITE_BASE_URL + "/users";
  }
  async getProfile() {
    const res = await fetch(`${this.baseUrl}/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch user profile");
    }
    return result;
  }
  async updateProfile(data) {
    const res = await fetch(`${this.baseUrl}/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to update user profile");
    }
    return result;
  }
}
const userApi = new UserApi();
export default userApi;
