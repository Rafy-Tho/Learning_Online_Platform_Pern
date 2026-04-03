class CourseApi {
  constructor() {
    this.baseUrl = import.meta.env.VITE_BASE_URL + "/courses";
  }

  async getCourses(queryString) {
    const res = await fetch(`${this.baseUrl}?${queryString}`);
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch courses");
    }
    return result;
  }
  async getCourseDetails(courseId) {
    const res = await fetch(`${this.baseUrl}/${courseId}`);
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch course details");
    }
    return result;
  }
  async getCourseLearningData(courseId) {
    const res = await fetch(`${this.baseUrl}/${courseId}/learn`);
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch course learning data");
    }
    return result;
  }
  async getCourseObjectives(courseId) {
    const res = await fetch(`${this.baseUrl}/${courseId}/objectives`);
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch course objectives");
    }
    return result;
  }
  async getFirstLesson(courseId) {
    const res = await fetch(`${this.baseUrl}/${courseId}/lessons/first`);
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch first lesson");
    }
    return result;
  }
  async getReviews(queryString, courseId) {
    const res = await fetch(
      `${this.baseUrl}/${courseId}/reviews?${queryString}`,
      {
        credentials: "include",
      },
    );
    const result = await res.json();
    console.log(result);
    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch reviews");
    }
    return result;
  }

  async getReviewDetails(courseId) {
    const res = await fetch(`${this.baseUrl}/${courseId}/reviews/summary`);
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch review details");
    }
    return result;
  }
}
const courseApi = new CourseApi();
export default courseApi;
