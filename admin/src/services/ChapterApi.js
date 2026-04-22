class ChapterApi {
  constructor() {
    this.baseUrl = import.meta.env.VITE_BASE_URL + '/chapters';
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
      throw new Error(result.message || 'Failed to update chapter');
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
      throw new Error(result.message || 'Failed to delete chapter');
    }
    return result;
  }

  async createLesson(id, data) {
    const res = await fetch(`${this.baseUrl}/${id}/lessons`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || 'Failed to create lesson');
    }
    return result;
  }
}
const chapterApi = new ChapterApi();
export default chapterApi;
