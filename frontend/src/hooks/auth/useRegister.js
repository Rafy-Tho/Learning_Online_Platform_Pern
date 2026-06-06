import { useRegister as useRegisterMutation } from "../mutations/useAuthMutations";

export default function useRegister() {
  const { mutateAsync: registerUser, isPending, error } = useRegisterMutation();
  return { registerUser, isPending, error };
}
