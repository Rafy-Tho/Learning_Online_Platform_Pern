import { useState } from "react";
import { Menu, X } from "lucide-react";
import { LessonContent } from "../components/courseLearing/LessonContent";
import { CourseSidebar } from "../components/courseLearing/CourseSidebar";

const CourseLearningScreen = () => {
  const [activeLesson, setActiveLesson] = useState("l1");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        className={`fixed inset-y-0 left-0 z-40 w-[320px] transform transition-transform duration-200 ease-out lg:relative lg:translate-x-0 lg:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <CourseSidebar
          activeLesson={activeLesson}
          onSelectLesson={(id) => {
            setActiveLesson(id);
            setSidebarOpen(false);
          }}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 px-4 py-2 lg:justify-end">
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-md p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
          >
            <Menu size={20} />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto">
          <LessonContent />
        </main>
      </div>
    </div>
  );
};

export default CourseLearningScreen;
