class AuthApi {
  constructor() {
    this.baseUrl = import.meta.env.VITE_BASE_URL + "/users";
  }
  async login(data) {
    const res = await fetch(`${this.baseUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Login failed");
    }
    return result;
  }
  async logout() {
    const res = await fetch(`${this.baseUrl}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to logout");
    }
    return result;
  }
}
const authApi = new AuthApi();
export default authApi;
