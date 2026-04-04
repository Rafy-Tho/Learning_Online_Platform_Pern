import { useRef } from "react";
import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import { CourseSidebar } from "../components/courseLearning/CourseSidebar";
import NextPrevious from "../components/courseLearning/NextPrevious";

const CourseLearningScreen = () => {
  const { sidebarOpen, setSidebarOpen } = useOutletContext();
  const sectionRef = useRef(null);
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100 dark:bg-slate-900">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/20 dark:bg-slate-950/20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Mobile sidebar (overlay) */}
      <div
        className={`fixed top-0 left-0 h-full z-40 w-[320px] lg:hidden
      transition-transform duration-200 ease-out pt-15
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    `}
      >
        <CourseSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Desktop layout with collapsible sidebar */}
      <div className="hidden lg:flex w-full">
        {/* Desktop sidebar - collapsible by controlling width */}
        <div
          className={`
        shrink-0 transition-all duration-200 ease-out overflow-hidden
        ${sidebarOpen ? "w-[320px]" : "w-0"}
      `}
        >
          <div className="w-[320px] h-full">
            <CourseSidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>

        {/* Desktop main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <main
            key={location.pathname}
            className="flex-1 overflow-y-auto"
            ref={sectionRef}
          >
            <Outlet />
            {/* Navigation buttons */}
            <NextPrevious />
          </main>
        </div>
      </div>

      {/* Mobile main content */}
      <div className="lg:hidden flex-1 flex flex-col overflow-hidden">
        <main
          key={location.pathname}
          className="flex-1 overflow-y-auto"
          ref={sectionRef}
        >
          <Outlet />
          {/* Navigation buttons for mobile */}
          <NextPrevious />
        </main>
      </div>
    </div>
  );
};

export default CourseLearningScreen;
