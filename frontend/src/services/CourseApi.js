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
  async createReview({ courseId, description, rating }) {
    const res = await fetch(`${this.baseUrl}/${courseId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ description, rating }),
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to create review");
    }
    return result;
  }
  async getReview(courseId) {
    const res = await fetch(`${this.baseUrl}/${courseId}/reviews/me`, {
      credentials: "include",
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch review");
    }
    return result;
  }
  async enrollCourse(courseId) {
    const res = await fetch(`${this.baseUrl}/${courseId}/enrollments`, {
      method: "POST",
      credentials: "include",
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to enroll course");
    }
    return result;
  }
  async getEnrollment(courseId) {
    const res = await fetch(`${this.baseUrl}/${courseId}/enrollments`, {
      method: "GET",
      credentials: "include",
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to get enrollment");
    }
    return result;
  }
  async createCourseProgress(courseId) {
    const res = await fetch(`${this.baseUrl}/${courseId}/progresses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to create course progress");
    }
    return result;
  }
  async getCourseProgress(courseId) {
    const res = await fetch(`${this.baseUrl}/${courseId}/progresses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to get course progress");
    }
    return result;
  }
  async updateCourseProgress({ courseId, lessonId }) {
    const res = await fetch(`${this.baseUrl}/${courseId}/progresses`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ lessonId }),
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to update course progress");
    }
    return result;
  }
  async getRecentlyViewedCourses() {
    const res = await fetch(`${this.baseUrl}/recently-viewed`, {
      credentials: "include",
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(
        result.message || "Failed to fetch recently viewed courses",
      );
    }
    return result;
  }

  async getRecommendedCourses() {
    const res = await fetch(`${this.baseUrl}/recommended`, {
      credentials: "include",
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch recommended courses");
    }
    return result;
  }
  async getPopularCourses() {
    const res = await fetch(`${this.baseUrl}/popular`, {
      credentials: "include",
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to fetch popular courses");
    }
    return result;
  }
  async getCourseInProgress() {
    const res = await fetch(`${this.baseUrl}/in-progress`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to get course progress");
    }
    return result;
  }
  async getCompletedCourse() {
    const res = await fetch(`${this.baseUrl}/completed`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || "Failed to get course progress");
    }
    return result;
  }
}

const courseApi = new CourseApi();
export default courseApi;
