import { useMutation } from "@tanstack/react-query";
import authApi from "../../services/authApi";

function useVerifyResetPasswordCode() {
  const {
    mutate: verifyResetPasswordCode,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["verifyResetPasswordCode"],
    mutationFn: (data) => authApi.verifyPasswordResetCode(data),
  });
  return { verifyResetPasswordCode, isPending, error };
}

export default useVerifyResetPasswordCode;
