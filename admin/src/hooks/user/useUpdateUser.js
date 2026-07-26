import { useMutation, useQueryClient } from "@tanstack/react-query";
import userApi from "../../services/UserApi";

function useUpdateUser() {
  const queryClient = useQueryClient();
  const {
    mutateAsync: updateUser,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["update-user"],
    mutationFn: ({ id, data }) => userApi.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });
  return { updateUser, isPending, error };
}

export default useUpdateUser;
