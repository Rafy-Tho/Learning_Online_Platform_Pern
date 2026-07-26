import { useLogoutApi } from "../mutations/useAuthMutations";
import useAuth from "../useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function useLogout() {
  const { clearAuth } = useAuth();
  const navigate = useNavigate();
  const mutation = useLogoutApi();

  const logout = async () => {
    try {
      await mutation.mutateAsync();
      toast.success("Logout success");
      clearAuth();
      console.log("Logout success");
      window.location.href = "/login";
    } catch (err) {
      toast.error(err.message || "Logout failed");
    }
  };

  return { logout, isPending: mutation.isPending };
}
