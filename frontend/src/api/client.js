const BASE_URL = import.meta.env.VITE_BASE_URL;

class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      credentials: "include",
      headers: { "Content-Type": "application/json", ...options.headers },
      ...options,
    };

    if (options.body instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    const response = await fetch(url, config);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Something went wrong");
    }

    if (result.pagination) {
      return { data: result.data, pagination: result.pagination };
    }
    return result.data;
  }

  get(endpoint) {
    return this.request(endpoint);
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  patch(endpoint, data) {
    return this.request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: "DELETE" });
  }

  upload(endpoint, formData) {
    return this.request(endpoint, {
      method: "PATCH",
      body: formData,
    });
  }
}

export const api = new ApiClient(BASE_URL);
