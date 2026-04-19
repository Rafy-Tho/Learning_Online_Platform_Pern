class CategoryApi {
  constructor() {
    this.baseUrl = import.meta.env.VITE_BASE_URL + '/categories';
  }
  async getCategories() {
    const res = await fetch(`${this.baseUrl}`);
    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || 'Failed to fetch categories');
    }
    return result;
  }

  async createCategory(category) {
    const res = await fetch(`${this.baseUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(category),
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || 'Failed to create category');
    }
    return result;
  }
  async updateCategory(id, category) {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(category),
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || 'Failed to update category');
    }
    return result;
  }
  async deleteCategory(id) {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || 'Failed to delete category');
    }
    return result;
  }
}

const categoryApi = new CategoryApi();

export default categoryApi;
