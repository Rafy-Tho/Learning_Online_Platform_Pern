import { useQuery } from "@tanstack/react-query";
import userApi from "../../services/UserApi";

export default function useGetDashboardData() {
  const { data, isPending, error } = useQuery({
    queryKey: "dashboard-data",
    queryFn: () => userApi.getDashboardData(),
  });
  return { data, isPending, error };
}
