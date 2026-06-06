import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../api/auth";

export function useLogin() {
  return useMutation({
    mutationKey: ["login"],
    mutationFn: (data) => authApi.login(data),
  });
}

export function useRegister() {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: (data) => authApi.register(data),
  });
}

export function useLogoutApi() {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: () => authApi.logout(),
  });
}

export function useSendResetPasswordCode() {
  return useMutation({
    mutationKey: ["sendResetPasswordCode"],
    mutationFn: (data) => authApi.sendResetPasswordCode(data),
  });
}

export function useVerifyResetPasswordCode() {
  return useMutation({
    mutationKey: ["verifyResetPasswordCode"],
    mutationFn: (data) => authApi.verifyPasswordResetCode(data),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationKey: ["resetPassword"],
    mutationFn: (data) => authApi.resetPassword(data),
  });
}
