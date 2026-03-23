import { useMutation } from "@tanstack/react-query";
import authApi from "../../services/authApi";

function useSendResetPasswordCode() {
  const {
    mutate: sendResetPasswordCode,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["sendResetPasswordCode"],
    mutationFn: (data) => authApi.sendResetPasswordCode(data),
  });
  return { sendResetPasswordCode, isPending, error };
}

export default useSendResetPasswordCode;
