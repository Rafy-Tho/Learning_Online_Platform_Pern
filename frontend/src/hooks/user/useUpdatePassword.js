import { useMutation } from "@tanstack/react-query";
import userApi from "../../services/UserApi";

function useUpdatePassword() {
  const {
    mutateAsync: updatePassword,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["update-password"],
    mutationFn: async (data) => userApi.changePassword(data),
  });
  return { updatePassword, isPending, error };
}

export default useUpdatePassword;
