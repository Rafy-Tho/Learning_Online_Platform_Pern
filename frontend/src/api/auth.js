import { api } from "./client";

export const authApi = {
  login: (data) => api.post("/users/login", data),
  register: (data) => api.post("/users/register", data),
  logout: () => api.post("/users/logout"),
  sendResetPasswordCode: (data) => api.post("/users/password-reset-code", data),
  verifyPasswordResetCode: (data) => api.post("/users/verify-password-reset-code", data),
  resetPassword: (data) => api.post("/users/reset-password", data),
};
