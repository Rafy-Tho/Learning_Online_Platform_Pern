import { useMutation } from "@tanstack/react-query";
import userApi from "../../services/UserApi";

function useUpdateUserProfile() {
  const {
    mutateAsync: updateProfile,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["update-profile"],
    mutationFn: (data) => userApi.updateProfile(data),
  });
  return { updateProfile, isPending, error };
}

export default useUpdateUserProfile;
