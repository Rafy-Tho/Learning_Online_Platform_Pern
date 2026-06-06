import { api } from "./client";

export const subscriptionsApi = {
  getById: (id) => api.get(`/subscriptions/${id}`),
  getActive: () => api.get("/subscriptions/user-active"),
};
