import { Outlet } from "react-router-dom";
import LearningNavigation from "./LearningNavigation";
import { useState } from "react";

function LearningLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-white">
      <LearningNavigation
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <Outlet context={{ sidebarOpen, setSidebarOpen }} />
    </div>
  );
}

export default LearningLayout;
