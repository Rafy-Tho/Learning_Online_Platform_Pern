import { useMutation } from "@tanstack/react-query";
import authApi from "../../services/AuthApi";
import { toast } from "react-toastify";
import useAuth from "../useAuth";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const { clearAuth } = useAuth();
  const navigate = useNavigate();
  const {
    mutate: logout,
    isPending,
    error,
  } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      toast.success("Logout success");
      clearAuth();
      navigate("/login");
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Logout failed");
    },
  });
  return { logout, isPending, error };
}

export default useLogout;
