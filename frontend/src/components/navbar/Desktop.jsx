import { NavLink } from "react-router-dom";
import { navLinks } from "../../constants/navLinks";

function Desktop({ closeAll }) {
  return (
    <nav className="hidden lg:flex items-center flex-1 justify-center">
      <ul className="flex items-center gap-1">
        {navLinks.map((link) => (
          <li key={link.label}>
            <NavLink
              to={link.href}
              onClick={() => {
                closeAll();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-3 xl:px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-sm whitespace-nowrap transition-colors rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Desktop;
