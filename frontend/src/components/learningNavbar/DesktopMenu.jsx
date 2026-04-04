import { useId } from "react";
import useMenuState from "../../hooks/useMenuState";
import { MoreVertical, StarOff } from "lucide-react";
import DesktopMoreMenuContent from "./DesktopMoreMenuContent";
import UnlockAccessButton from "./UnlockAccessButton";
import useGetReview from "../../hooks/course/useGetReview";
import RatingStars from "../RatingStars";

/**
 * Desktop menu component (visible on md and above)
 * Uses its own state management
 */
function DesktopMenu({ setRatingOpen }) {
  const {
    isOpen: moreMenuOpen,
    setIsOpen: setMoreMenuOpen,
    menuRef: desktopMoreRef,
  } = useMenuState();
  const moreMenuId = useId();
  const { data } = useGetReview();
  const reviews = data?.data;
  return (
    <div className="hidden min-w-0 flex-wrap items-center justify-end gap-2 sm:gap-2.5 md:flex md:shrink-0">
      {/* Unlock Full Access Button */}
      <UnlockAccessButton />
      {/* Your Reviews  */}
      {reviews && (
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <RatingStars rating={reviews?.rating} />
          <div className="flex items-baseline gap-1">
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {reviews?.rating}
            </span>
          </div>
        </div>
      )}
      {/* Leave Review Button */}
      {!reviews && (
        <button
          onClick={() => setRatingOpen(true)}
          type="button"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 hover:shadow-md active:scale-95 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700/80 cursor-pointer"
        >
          <StarOff className="h-4 w-4 text-amber-500 transition-transform duration-200 group-hover:rotate-12" />
          Leave Review
        </button>
      )}

      {/* More Menu */}
      <div ref={desktopMoreRef} className="relative">
        <button
          type="button"
          id={`${moreMenuId}-trigger`}
          aria-expanded={moreMenuOpen}
          aria-controls={moreMenuId}
          aria-haspopup="true"
          className={`flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition-all duration-200 hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 ${
            moreMenuOpen ? "bg-slate-100 text-slate-700 dark:bg-slate-800" : ""
          }`}
          onClick={() => setMoreMenuOpen(!moreMenuOpen)}
        >
          <MoreVertical className="h-4 w-4" />
        </button>

        {moreMenuOpen && (
          <DesktopMoreMenuContent
            moreMenuId={moreMenuId}
            setMoreMenuOpen={setMoreMenuOpen}
          />
        )}
      </div>
    </div>
  );
}
export default DesktopMenu;
