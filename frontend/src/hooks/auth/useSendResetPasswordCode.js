import { useSendResetPasswordCode as useSendCode } from "../mutations/useAuthMutations";

export default function useSendResetPasswordCode() {
  const { mutate: sendResetPasswordCode, isPending, error } = useSendCode();
  return { sendResetPasswordCode, isPending, error };
}
