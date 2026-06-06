import { api } from "./client";

export const categoriesApi = {
  getAll: () => api.get("/categories"),
};
