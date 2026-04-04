import { useId } from "react";
import useMenuState from "../../hooks/useMenuState";
import { MoreVertical } from "lucide-react";
import MobileMenuContent from "./MobileMenuContent";

/**
 * Mobile menu component (visible below md breakpoint)
 * Uses its own state management
 */
function MobileMenu({ setRatingOpen }) {
  const { isOpen: menuOpen, setIsOpen: setMenuOpen, menuRef } = useMenuState();
  const menuId = useId();

  return (
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
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <MoreVertical className="h-5 w-5" />
      </button>

      {menuOpen && (
        <MobileMenuContent
          menuId={menuId}
          setMenuOpen={setMenuOpen}
          setRatingOpen={setRatingOpen}
        />
      )}
    </div>
  );
}

export default MobileMenu;
