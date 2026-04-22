class QuestionApi {
  constructor() {
    this.baseUrl = import.meta.env.VITE_BASE_URL + '/questions';
  }

  async update(id, data) {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || 'Failed to update question');
    }
    return result;
  }

  async delete(id) {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || 'Failed to delete question');
    }
    return result;
  }

  async createOption(id, data) {
    const res = await fetch(`${this.baseUrl}/${id}/options`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || 'Failed to create option');
    }
    return result;
  }
}
const questionApi = new QuestionApi();
export default questionApi;
