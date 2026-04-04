import { Sparkles } from "lucide-react";

/**
 * Reusable Unlock Access button component
 */
function UnlockAccessButton({ fullWidth = false }) {
  const buttonClasses = fullWidth
    ? "relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-center text-sm font-semibold text-white shadow-md transition-all active:scale-95"
    : "group relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 dark:from-blue-500 dark:to-indigo-500 cursor-pointer";

  const content = fullWidth ? (
    <span className="relative z-10 flex items-center justify-center gap-2">
      <Sparkles className="h-4 w-4" />
      Unlock Full Access
    </span>
  ) : (
    <span className="relative z-10 flex items-center gap-2">
      <Sparkles className="h-4 w-4 animate-pulse" />
      Unlock Full Access
    </span>
  );

  return (
    <div className={fullWidth ? "relative mb-3" : ""}>
      <button type="button" className={buttonClasses}>
        {content}
        {!fullWidth && (
          <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full"></div>
        )}
      </button>
    </div>
  );
}
export default UnlockAccessButton;
