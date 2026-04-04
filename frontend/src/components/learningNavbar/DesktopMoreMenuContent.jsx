import { Award, Shield, TrendingUp } from "lucide-react";
import ThemeSelector from "../ThemSelector";

/**
 * Desktop more menu content
 */
function DesktopMoreMenuContent({ moreMenuId }) {
  return (
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
  );
}

export default DesktopMoreMenuContent;
