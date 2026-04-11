import { useMutation } from "@tanstack/react-query";
import authApi from "../../services/AuthApi";

function useLogin() {
  const {
    mutateAsync: login,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: (data) => authApi.login(data),
  });
  return { login, isPending, error };
}

export default useLogin;
