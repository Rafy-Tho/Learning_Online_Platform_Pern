class LessonApi {
  constructor() {
    this.baseUrl = import.meta.env.VITE_BASE_URL + "/lessons";
  }

  async getLesson(id) {
    const res = await fetch(`${this.baseUrl}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch lesson");
    }
    return result;
  }
  async getLessonContent(id) {
    const res = await fetch(`${this.baseUrl}/${id}/contents`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch lesson content");
    }
    return result;
  }

  async getQuizzes(id) {
    const res = await fetch(`${this.baseUrl}/${id}/questions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch quizzes");
    }
    return result;
  }
  async progressLesson(id) {
    const res = await fetch(`${this.baseUrl}/${id}/progresses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to progress lesson");
    }
    return result;
  }
  async completeLesson(id) {
    const res = await fetch(`${this.baseUrl}/${id}/completes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to complete lesson");
    }
    return result;
  }
}
const lessonApi = new LessonApi();
export default lessonApi;
