import { MenuIcon, X } from "lucide-react";

function Menu({ mobileMenuOpen, toggleMobileMenu }) {
  return (
    <button
      onClick={toggleMobileMenu}
      className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle menu"
    >
      {mobileMenuOpen ? <X /> : <MenuIcon />}
    </button>
  );
}

export default Menu;
