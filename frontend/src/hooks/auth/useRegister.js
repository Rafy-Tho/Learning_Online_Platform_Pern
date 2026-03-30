import { useMutation } from "@tanstack/react-query";
import authApi from "../../services/AuthApi";

function useRegister() {
  const {
    mutate: registerUser,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["register"],
    mutationFn: (data) => authApi.register(data),
  });
  return { registerUser, isPending, error };
}

export default useRegister;
