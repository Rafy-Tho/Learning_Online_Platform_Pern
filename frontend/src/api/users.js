import { api } from "./client";

export const usersApi = {
  getMe: () => api.get("/users/me"),
  getProfile: () => api.get("/users/profile"),
  updateProfile: (formData) => api.upload("/users/profile", formData),
  updateMe: (data) => api.patch("/users/me", data),
  getXpEarned: () => api.get("/users/xp-earned"),
  createPayment: (id) => api.post(`/users/payment-stripe/${id}`),
  changePassword: (data) => api.patch("/users/update-password", data),
};
