import { useEffect, useRef } from "react";
import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import { CourseSidebar } from "../components/courseLearning/CourseSidebar";

const CourseLearningScreen = () => {
  const { sidebarOpen, setSidebarOpen } = useOutletContext();
  const sectionRef = useRef(null);
  const location = useLocation();
  useEffect(() => {
    sectionRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  return (
    <div className="flex h-screen overflow-hidden bg-slate-100 dark:bg-slate-900">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/20 dark:bg-slate-950/20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:relative inset-y-0 left-0 top-16 lg:top-0 z-40
    transform transition-transform duration-200 ease-out  w-[320px] lg:translate-x-0
   
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
  `}
      >
        <CourseSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto" ref={sectionRef}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CourseLearningScreen;
