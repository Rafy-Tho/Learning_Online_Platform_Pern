import { NavLink } from "react-router-dom";
import {
  avatarMenuItems,
  navLinks,
  pricingItems,
} from "../../constants/constant";
import ThemeSelector from "../ThemSelector";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/auth/useLogout";

function Mobile({
  mobileMenuOpen,
  closeAll,
  togglePricing,
  pricingOpen,
  avatarOpen,
  toggleAvatar,
}) {
  const { user } = useAuth();
  const { logout } = useLogout();

  return (
    mobileMenuOpen && (
      <div className="lg:hidden fixed inset-0 top-16 bg-white dark:bg-gray-800 z-40 overflow-y-auto">
        <nav className="p-4 space-y-4">
          {/* Mobile Navigation Links */}
          <div className="space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                href={link.href}
                onClick={() => {
                  closeAll();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="block px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Pricing with Dropdown */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <button
              onClick={togglePricing}
              className="flex items-center justify-between w-full px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
            >
              <span>Pricing</span>
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

            {/* Mobile Pricing Dropdown Items */}
            {pricingOpen && (
              <div className="mt-2 ml-4 space-y-1">
                {pricingItems.map((item) => (
                  <NavLink
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      closeAll();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <i className={`${item.icon} text-blue-500 w-5`}></i>
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Mobile User Info with Dropdown */}
          {user && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <button
                onClick={toggleAvatar}
                className="flex items-center justify-between w-full px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={user?.image_url}
                    alt="User avatar"
                  />
                  <div className="text-left">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user?.email}
                    </p>
                  </div>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-4 h-4 transition-transform duration-200 ${avatarOpen ? "rotate-180" : ""}`}
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

              {/* Mobile Avatar Dropdown Items */}
              {avatarOpen && (
                <div className="mt-2 ml-4 space-y-1">
                  <div className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <ThemeSelector />
                  </div>
                  {avatarMenuItems.map((item) => (
                    <NavLink
                      key={item.label}
                      href={item.href}
                      onClick={closeAll}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700
                    `}
                    >
                      <i
                        className={`${item.icon} w-5 text-gray-500 dark:text-gray-400`}
                      ></i>
                      {item.label}
                    </NavLink>
                  ))}
                  <button
                    onClick={() => {
                      logout();
                      closeAll();
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20
                     `}
                  >
                    <i
                      className={` fa-solid fa-arrow-right-from-bracket w-5 text-red-500`}
                    ></i>
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </div>
    )
  );
}
export default Mobile;
