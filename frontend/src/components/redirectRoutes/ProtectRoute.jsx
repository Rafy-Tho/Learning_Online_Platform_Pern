import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function ProtectRoute() {
  const { user } = useAuth();

  if (user === null) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default ProtectRoute;
