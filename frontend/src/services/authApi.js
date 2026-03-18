class AuthApi {
  async login(data) {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/users/login`, {
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
  async register(data) {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Register failed");
    }
    return result;
  }
  async logout() {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
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
