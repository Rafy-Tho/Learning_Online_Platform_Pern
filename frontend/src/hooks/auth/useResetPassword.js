import { useResetPassword as useResetPwd } from "../mutations/useAuthMutations";

export default function useResetPassword() {
  const { mutate: resetPassword, isPending, error } = useResetPwd();
  return { resetPassword, isPending, error };
}
