import { useQuery } from "@tanstack/react-query";
import { usersApi } from "../../api/users";

function getUserLocal() {
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : null;
}

function isAuthenticated() {
  return localStorage.getItem("isAuthenticated") === "true";
}

export function useGetMe() {
  const localUser = getUserLocal();
  const hasLocalAuth = isAuthenticated() && !!localUser;

  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      try {
        return await usersApi.getMe();
      } catch (err) {
        if (err?.message === "Unauthorized") return null;
        throw err;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: hasLocalAuth,
    placeholderData: hasLocalAuth ? localUser : undefined,
  });
}
