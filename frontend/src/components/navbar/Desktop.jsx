import { NavLink } from "react-router-dom";
import { navLinks } from "../../constants/navLinks";

function Desktop({ closeAll }) {
  return (
    <nav className="hidden lg:flex items-center flex-1 justify-center">
      <ul className="flex items-center gap-4">
        {navLinks.map((link) => (
          <li key={link.label}>
            <NavLink
              to={link.href}
              onClick={() => {
                closeAll();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-2 border-blue-500 text-blue-500"
                    : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                } whitespace-nowrap px-1 pb-3 text-sm font-medium transition-colors`
              }
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
