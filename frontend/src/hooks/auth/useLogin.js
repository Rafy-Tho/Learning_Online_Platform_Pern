import { useLogin as useLoginMutation } from "../mutations/useAuthMutations";

export default function useLogin() {
  const { mutateAsync: login, isPending, error } = useLoginMutation();
  return { login, isPending, error };
}
