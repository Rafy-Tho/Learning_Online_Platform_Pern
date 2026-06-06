import { useMutation } from "@tanstack/react-query";
import { usersApi } from "../../api/users";

export function useUpdateUserProfile() {
  return useMutation({
    mutationKey: ["update-profile"],
    mutationFn: (data) => usersApi.updateProfile(data),
  });
}

export function useUpdatePassword() {
  return useMutation({
    mutationKey: ["update-password"],
    mutationFn: (data) => usersApi.changePassword(data),
  });
}

export function useCreatePayment() {
  return useMutation({
    mutationKey: ["create-payment"],
    mutationFn: (id) => usersApi.createPayment(id),
  });
}
