import { Outlet } from "react-router-dom";
import LearningNavigation from "./LearningNavigation";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Don't forget this!
import useAuth from "../hooks/useAuth";
import FullScreenSkeletonLoader from "../ui/FullScreenSkeletonLoader";
import ErrorMessage from "../ui/ErrorMessage";
function LearningLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [ratingOpen, setRatingOpen] = useState(false);
  const { isLoading, error } = useAuth();
  useEffect(() => {
    // Close sidebar on mobile by default
    const checkScreenSize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    1;
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
  if (isLoading) return <FullScreenSkeletonLoader />;
  if (error) return <ErrorMessage message={error.message || "Server error"} />;
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-white">
      <LearningNavigation
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        ratingOpen={ratingOpen}
        setRatingOpen={setRatingOpen}
      />
      <Outlet
        context={{ sidebarOpen, setSidebarOpen, ratingOpen, setRatingOpen }}
      />
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

export default LearningLayout;
