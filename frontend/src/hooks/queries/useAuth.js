import { useQuery } from "@tanstack/react-query";
import { usersApi } from "../../api/users";

function getUserLocal() {
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : null;
}

function isAuthenticated() {
  const isAuth = localStorage.getItem("isAuthenticated");
  return isAuth === "true";
}

export function useGetMe() {
  const localUser = getUserLocal();
  const authStatus = isAuthenticated();
  return useQuery({
    queryKey: ["me"],
    queryFn: () => usersApi.getMe(),
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    enabled: !!authStatus && localUser,
  });
}
