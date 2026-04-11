import { useQuery } from "@tanstack/react-query";
import userApi from "../../services/UserApi";

function useGetProfile() {
  const { data, isPending, error } = useQuery({
    queryKey: ["me"],
    queryFn: async () => userApi.getProfile(),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  return { data, isPending, error };
}

export default useGetProfile;
