import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navigation from "./Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Don't forget this!
function AppLayout() {
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
