class UserApi {
  constructor() {
    this.baseUrl = import.meta.env.VITE_BASE_URL + "/users";
    this.adminBaseUrl = import.meta.env.VITE_BASE_URL + "/admin/users";
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
  async updatePassword(data) {
    const res = await fetch(`${this.baseUrl}/update-password`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to update password");
    }
    return result;
  }
  async getDashboardData() {
    const res = await fetch(`${this.baseUrl}/dashboard-data`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch dashboard data");
    }
    return result;
  }
  async getUsers(params) {
    const url = params ? `${this.adminBaseUrl}?${params}` : this.adminBaseUrl;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch users");
    }
    return result;
  }
  async createUser(data) {
    const res = await fetch(this.adminBaseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to create user");
    }
    return result;
  }
  async updateUser(id, data) {
    const res = await fetch(`${this.adminBaseUrl}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to update user");
    }
    return result;
  }
  async deleteUser(id) {
    const res = await fetch(`${this.adminBaseUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to delete user");
    }
    return result;
  }
}
const userApi = new UserApi();
export default userApi;
