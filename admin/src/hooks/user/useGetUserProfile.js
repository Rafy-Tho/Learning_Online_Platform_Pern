import { useQuery } from "@tanstack/react-query";
import userApi from "../../services/UserApi";

function useGetUserProfile() {
  const { data, isPending, error } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => userApi.getProfile(),
  });
  return { data, isPending, error };
}

export default useGetUserProfile;
