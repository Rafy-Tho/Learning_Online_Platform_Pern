import { Outlet } from "react-router-dom";
import LearningNavigation from "./LearningNavigation";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Don't forget this!
function LearningLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [ratingOpen, setRatingOpen] = useState(false);
  useEffect(() => {
    // Close sidebar on mobile by default
    const checkScreenSize = () => {
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
1
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
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
