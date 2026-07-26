import { useQuery } from "@tanstack/react-query";
import userApi from "../../services/UserApi";

function useGetUsers({ role, page, limit } = {}) {
  const params = new URLSearchParams();
  if (role) params.set("role", role);
  if (page) params.set("page", page);
  if (limit) params.set("limit", limit);
  const queryString = params.toString();

  const { data, isPending, error } = useQuery({
    queryKey: ["admin-users", { role, page, limit }],
    queryFn: () => userApi.getUsers(queryString || undefined),
  });
  return { data, isPending, error };
}

export default useGetUsers;
