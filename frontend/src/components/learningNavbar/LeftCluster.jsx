import { ChevronLeft, PanelLeft, PanelLeftClose } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Left side navigation cluster (shared across devices)
 */
function LeftCluster({ courseId, sidebarOpen, setSidebarOpen }) {
  return (
    <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5 sm:gap-2 md:gap-3">
      <Link
        to={`/courses/${courseId}`}
        type="button"
        className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 active:scale-95 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
        aria-label="Go back"
      >
        <ChevronLeft className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
      </Link>

      <Link
        to={`/`}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 font-mono text-[10px] font-semibold leading-none text-white shadow-lg transition-all duration-200 hover:scale-105 dark:from-blue-500 dark:to-indigo-500"
        aria-hidden
      >
        <span className="select-none">&gt;_</span>
      </Link>

      <div
        className="hidden h-6 w-px shrink-0 bg-gradient-to-b from-transparent via-slate-300 to-transparent dark:via-slate-600 sm:block"
        aria-hidden
      />

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        type="button"
        className="group flex min-w-0 items-center gap-1.5 rounded-lg px-2 py-1.5 text-left text-sm font-medium text-slate-700 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-slate-100"
      >
        {sidebarOpen ? (
          <PanelLeftClose className="h-4 w-4 shrink-0 text-slate-500 transition-all duration-200 group-hover:-translate-x-0.5 group-hover:text-blue-600 dark:text-slate-400 dark:group-hover:text-blue-400" />
        ) : (
          <PanelLeft className="h-4 w-4 shrink-0 text-slate-500 transition-all duration-200 group-hover:-translate-x-0.5 group-hover:text-blue-600 dark:text-slate-400 dark:group-hover:text-blue-400" />
        )}
        <span className="truncate">Mini Map</span>
      </button>
    </div>
  );
}
export default LeftCluster;
