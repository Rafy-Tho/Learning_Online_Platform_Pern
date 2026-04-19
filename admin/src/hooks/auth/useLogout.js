import { useMutation } from "@tanstack/react-query";
import authApi from "../../services/AuthApi";
import { toast } from "react-toastify";
import useAuth from "../useAuth";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const { clearAuth } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => authApi.logout(),
  });

  const logout = async () => {
    try {
      await mutation.mutateAsync(); // ✅ wait for API

      toast.success("Logout success");

      clearAuth(); // clear AFTER API success
      navigate("/login"); // navigate LAST
    } catch (err) {
      toast.error(err.message || "Logout failed");
    }
  };

  return { logout, isPending: mutation.isPending };
}

export default useLogout;
