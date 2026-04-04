import { useParams } from "react-router-dom";
import useScrollEffect from "../hooks/useScrollEffect";
import DesktopMenu from "./learningNavbar/DesktopMenu";
import LeftCluster from "./learningNavbar/LeftCluster";
import MobileMenu from "./learningNavbar/MobileMenu";

/**
 * Enhanced navigation bar with better styling and responsive design
 */
export function LearningNavigation({
  sidebarOpen,
  setSidebarOpen,
  setRatingOpen,
}) {
  const { courseId } = useParams();
  const scrolled = useScrollEffect();

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200 bg-white/95 shadow-lg backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/95"
          : "border-b border-slate-200/50 bg-white/80 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-900/80"
      }`}
    >
      <div className="mx-auto flex max-w-[100vw] flex-row flex-wrap items-center justify-between gap-2 px-3 py-2.5 sm:px-4 sm:py-3 md:gap-4 lg:px-6">
        {/* Left cluster - shared across all devices */}
        <LeftCluster
          courseId={courseId}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Desktop menu - visible on md and above */}
        <DesktopMenu setRatingOpen={setRatingOpen} />

        {/* Mobile menu - visible below md breakpoint */}
        <MobileMenu setRatingOpen={setRatingOpen} />
      </div>
    </header>
  );
}

export default LearningNavigation;
