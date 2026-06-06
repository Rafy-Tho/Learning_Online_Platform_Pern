import { useVerifyResetPasswordCode as useVerifyCode } from "../mutations/useAuthMutations";

export default function useVerifyResetPasswordCode() {
  const { mutate: verifyResetPasswordCode, isPending, error } = useVerifyCode();
  return { verifyResetPasswordCode, isPending, error };
}
