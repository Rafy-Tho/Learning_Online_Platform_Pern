import { useQuery } from "@tanstack/react-query";
import userApi from "../../services/UserApi";

function useGetExpEarned() {
  const { data, isPending, error } = useQuery({
    queryKey: ["xp-earned"],
    queryFn: async () => userApi.getXpEarned(),
  });
  return { data, isPending, error };
}

export default useGetExpEarned;
