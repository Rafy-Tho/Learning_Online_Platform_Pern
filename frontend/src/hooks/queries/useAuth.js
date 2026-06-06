import { useQuery } from "@tanstack/react-query";
import { usersApi } from "../../api/users";

export function useGetMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => usersApi.getMe(),
    retry: false,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
