import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function IsAuthenticate() {
  const { user } = useAuth();

  if (user !== null) return <Navigate to="/learning-dashboard" replace />;

  return <Outlet />;
}

export default IsAuthenticate;
