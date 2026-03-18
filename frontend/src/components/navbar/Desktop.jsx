import { NavLink } from "react-router-dom";
import { navLinks, pricingItems } from "../../constants/constant";

function Desktop({ closeAll, togglePricing, pricingOpen }) {
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

        {/* Pricing Dropdown */}
        <li className="relative">
          <button
            onClick={togglePricing}
            className="flex items-center gap-1 px-3 xl:px-4 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 font-medium text-sm whitespace-nowrap transition-colors rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Pricing
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-4 h-4 transition-transform duration-200 ${pricingOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Desktop Pricing Dropdown */}
          {pricingOpen && (
            <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 py-2 z-50">
              {pricingItems.map((item) => (
                <NavLink
                  key={item.label}
                  to={item.href}
                  onClick={() => {
                    closeAll();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                >
                  <i className={`${item.icon} text-blue-500 w-5`}></i>
                  <span className="text-sm font-medium">{item.label}</span>
                </NavLink>
              ))}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Desktop;
