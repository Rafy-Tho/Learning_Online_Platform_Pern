import { Award, Shield, StarOff, TrendingUp } from "lucide-react";
import UnlockAccessButton from "./UnlockAccessButton";
import ThemeSelector from "../ThemSelector";

/**
 * Mobile menu content
 */
function MobileMenuContent({ menuId, setMenuOpen, setRatingOpen }) {
  const handleLeaveReview = () => {
    setRatingOpen(true);
    setMenuOpen(false);
  };

  return (
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

      {/* Mobile CTA Buttons */}
      <UnlockAccessButton fullWidth />

      <button
        type="button"
        role="menuitem"
        className="flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 active:scale-95 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-700/80"
        onClick={handleLeaveReview}
      >
        <StarOff className="h-4 w-4 text-amber-500" />
        Leave Review
      </button>
    </div>
  );
}
export default MobileMenuContent;
