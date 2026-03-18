import { useMutation } from "@tanstack/react-query";
import authApi from "../../services/authApi";

function useLogin() {
  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["login"],
    mutationFn: (data) => authApi.login(data),
  });
  return { login, isPending, error };
}

export default useLogin;
