import { useMutation, useQueryClient } from "@tanstack/react-query";
import userApi from "../../services/UserApi";

function useCreateUser() {
  const queryClient = useQueryClient();
  const {
    mutateAsync: createUser,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["create-user"],
    mutationFn: (data) => userApi.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });
  return { createUser, isPending, error };
}

export default useCreateUser;
