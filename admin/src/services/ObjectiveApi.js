class ObjectiveApi {
  constructor() {
    this.baseUrl = import.meta.env.VITE_BASE_URL + '/objectives';
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
      throw new Error(result.message || 'Failed to update objective');
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
      throw new Error(result.message || 'Failed to delete objective');
    }
    return result;
  }
}
const objectiveApi = new ObjectiveApi();
export default objectiveApi;
