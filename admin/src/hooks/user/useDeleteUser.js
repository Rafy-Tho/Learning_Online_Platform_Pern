import { useMutation, useQueryClient } from "@tanstack/react-query";
import userApi from "../../services/UserApi";

function useDeleteUser() {
  const queryClient = useQueryClient();
  const {
    mutateAsync: deleteUser,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["delete-user"],
    mutationFn: (id) => userApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });
  return { deleteUser, isPending, error };
}

export default useDeleteUser;
