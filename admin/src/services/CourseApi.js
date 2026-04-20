class CourseApi {
  constructor() {
    this.baseUrl = import.meta.env.VITE_BASE_URL + '/courses';
  }
  async getAllCourses(params) {
    const res = await fetch(`${this.baseUrl}/dashboard?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || 'Failed to fetch courses');
    }
    return result;
  }
  async createCourse(data) {
    const res = await fetch(`${this.baseUrl}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || 'Failed to create course');
    }
    return result;
  }
  async updateCourse(id, data) {
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
      throw new Error(result.message || 'Failed to update course');
    }
    return result;
  }
}
const courseApi = new CourseApi();
export default courseApi;
