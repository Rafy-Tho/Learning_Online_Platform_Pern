import { useMutation } from "@tanstack/react-query";
import authApi from "../../services/authApi";

function useResetPassword() {
  const {
    mutate: resetPassword,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: (data) => authApi.resetPassword(data),
  });
  return { resetPassword, isPending, error };
}

export default useResetPassword;
