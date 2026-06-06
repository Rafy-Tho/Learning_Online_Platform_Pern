import { api } from "./client";

export const lessonsApi = {
  getById: (id) => api.get(`/lessons/${id}`),
  getContent: (id) => api.get(`/lessons/${id}/contents`),
  getQuizzes: (id) => api.get(`/lessons/${id}/questions`),
  progressLesson: (id) => api.post(`/lessons/${id}/progresses`),
  completeLesson: (id) => api.post(`/lessons/${id}/completions`),
  getCompletedLesson: (id) => api.get(`/lessons/${id}/completions`),
};
