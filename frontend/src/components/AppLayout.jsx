import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Don't forget this!
import Footer from "./Footer";
import Navigation from "./Navigation";
import useAuth from "../hooks/useAuth";
import FullScreenSkeletonLoader from "../ui/FullScreenSkeletonLoader";
import ErrorMessage from "../ui/ErrorMessage";
function AppLayout() {
  const { isLoading, error } = useAuth();
  if (isLoading) return <FullScreenSkeletonLoader />;
  if (error) return <ErrorMessage message={error.message || "Server error"} />;
  return (
    <div className="min-w-sm bg-slate-100 dark:bg-slate-900">
      <Navigation />
      <Outlet />
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default AppLayout;
