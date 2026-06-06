import { useQuery } from "@tanstack/react-query";
import { usersApi } from "../../api/users";

export function useUserProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => usersApi.getProfile(),
  });
}

export function useXpEarned() {
  return useQuery({
    queryKey: ["xp-earned"],
    queryFn: () => usersApi.getXpEarned(),
  });
}
