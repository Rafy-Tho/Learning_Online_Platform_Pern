import {
  ChevronLeft,
  Info,
  Moon,
  MoreVertical,
  PanelLeftClose,
  Sparkles,
  StarOff,
  Sun,
  Trash2,
  Zap,
  Gift,
  TrendingUp,
  Shield,
  Award,
  PanelRight,
  PanelLeft,
  PanelRightClose,
} from "lucide-react";
import React, { useEffect, useId, useRef, useState } from "react";
import ThemeSelector from "./ThemSelector";
import { Link, useParams } from "react-router-dom";

/**
 * Enhanced navigation bar with better styling and responsive design
 */
export function LearningNavigation({ sidebarOpen, setSidebarOpen }) {
  const { courseId } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuRef = useRef(null);
  const desktopMoreRef = useRef(null);
  const menuId = useId();
  const moreMenuId = useId();

  // Handle scroll effect for glass morphism
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on click outside
  useEffect(() => {
    if (!menuOpen && !moreMenuOpen) return;

    const handleClickOutside = (e) => {
      const target = e.target;
      if (menuRef.current?.contains(target)) return;
      if (desktopMoreRef.current?.contains(target)) return;
      setMenuOpen(false);
      setMoreMenuOpen(false);
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setMoreMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen, moreMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-200 bg-white/95 shadow-lg backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/95"
          : "border-b border-slate-200/50 bg-white/80 backdrop-blur-sm dark:border-slate-700/50 dark:bg-slate-900/80"
      }`}
    >
      <div className="mx-auto flex max-w-[100vw] flex-row flex-wrap items-center justify-between gap-2 px-3 py-2.5 sm:px-4 sm:py-3 md:gap-4 lg:px-6">
        {/* Left cluster */}
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

        {/* Right: inline md+ */}
        <div className="hidden min-w-0 flex-wrap items-center justify-end gap-2 sm:gap-2.5 md:flex md:shrink-0">
          {/* Access Progress Badge */}

          {/* Main CTA Button */}
          <div className="relative">
            <button
              type="button"
              className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 dark:from-blue-500 dark:to-indigo-500"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="h-4 w-4 animate-pulse" />
                Unlock Full Access
              </span>
              <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full"></div>
            </button>
          </div>

          {/* Leave Review Button */}
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:shadow-md active:scale-95 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700/80"
          >
            <StarOff className="h-4 w-4 text-amber-500 transition-transform duration-200 group-hover:rotate-12" />
            Leave Review
          </button>

          {/* More Menu Button */}
          <div ref={desktopMoreRef} className="relative">
            <button
              type="button"
              id={`${moreMenuId}-trigger`}
              aria-expanded={moreMenuOpen}
              aria-controls={moreMenuId}
              aria-haspopup="true"
              className={`flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 ${
                moreMenuOpen
                  ? "bg-slate-100 text-slate-700 dark:bg-slate-800"
                  : ""
              }`}
              onClick={() => setMoreMenuOpen((o) => !o)}
            >
              <MoreVertical className="h-4 w-4" />
            </button>

            {moreMenuOpen && (
              <div
                id={moreMenuId}
                role="menu"
                aria-labelledby={`${moreMenuId}-trigger`}
                className="absolute right-0 top-full z-50 mt-2 min-w-[20rem] origin-top-right animate-in slide-in-from-top-2 rounded-xl border border-slate-200 bg-white p-1 shadow-xl ring-1 ring-black/5 dark:border-slate-600 dark:bg-slate-800 dark:ring-white/10"
              >
                <div className="border-b border-slate-100 px-2 pb-2 pt-1 dark:border-slate-700">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Quick Actions
                  </p>
                </div>

                <div className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700">
                  <ThemeSelector />
                </div>

                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  View Analytics
                </button>

                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700">
                  <Shield className="h-4 w-4 text-blue-500" />
                  Privacy Settings
                </button>

                <div className="border-t border-slate-100 px-2 pb-1 pt-2 dark:border-slate-700">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Support
                  </p>
                </div>

                <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700">
                  <Award className="h-4 w-4 text-amber-500" />
                  Help & Tutorials
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right: compact menu below md breakpoint */}
        <div ref={menuRef} className="relative shrink-0 md:hidden">
          <button
            type="button"
            id={`${menuId}-trigger`}
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-haspopup="true"
            className={`flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 ${
              menuOpen ? "bg-slate-100 text-slate-700 dark:bg-slate-800" : ""
            }`}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <MoreVertical className="h-5 w-5" />
          </button>

          {menuOpen && (
            <div
              id={menuId}
              role="menu"
              aria-labelledby={`${menuId}-trigger`}
              className="absolute right-0 top-full z-50 mt-2 w-[min(100vw-1.5rem,20rem)] origin-top-right animate-in slide-in-from-top-2 rounded-xl border border-slate-200 bg-white p-2 shadow-xl ring-1 ring-black/5 dark:border-slate-600 dark:bg-slate-800 dark:ring-white/10"
            >
              <div className="border-b border-slate-100 px-2 pb-2 pt-1 dark:border-slate-700">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Quick Actions
                </p>
              </div>

              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700">
                <ThemeSelector />
              </button>

              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700">
                <TrendingUp className="h-4 w-4 text-green-500" />
                View Analytics
              </button>

              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700">
                <Shield className="h-4 w-4 text-blue-500" />
                Privacy Settings
              </button>

              <div className="border-t border-slate-100 px-2 pb-1 pt-2 dark:border-slate-700">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Support
                </p>
              </div>

              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700">
                <Award className="h-4 w-4 text-amber-500" />
                Help & Tutorials
              </button>
              {/* Main CTA */}
              <div className="relative mb-3">
                <button
                  type="button"
                  className="relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-center text-sm font-semibold text-white shadow-md transition-all active:scale-95"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Unlock Full Access
                  </span>
                </button>
              </div>

              {/* Menu Items */}
              <button
                type="button"
                role="menuitem"
                className="mb-2 flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 active:scale-95 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-700/80"
                onClick={() => setMenuOpen(false)}
              >
                <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                Leave Review
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default LearningNavigation;
