class CategoryApi {
  constructor() {
    this.baseUrl = import.meta.env.VITE_BASE_URL + "/categories";
  }
  async getCategories() {
    const res = await fetch(`${this.baseUrl}`);
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch categories");
    }
    return result;
  }
}

const categoryApi = new CategoryApi();

export default categoryApi;
