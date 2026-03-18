import { NavLink } from "react-router-dom";
import { avatarMenuItems } from "../../constants/constant";
import useAuth from "../../hooks/useAuth";
import ThemeSelector from "../ThemSelector";
import useLogout from "../../hooks/auth/useLogout";

function Avatar({ avatarOpen, toggleAvatar, closeAll }) {
  const { logout } = useLogout();
  const { user } = useAuth();
  if (!user) return null;
  return (
    <div className="relative">
      <button
        onClick={toggleAvatar}
        className="flex items-center focus:outline-none"
        aria-expanded={avatarOpen}
        aria-haspopup="true"
      >
        <img
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all"
          src={user?.image_url}
          alt="User avatar"
        />
      </button>

      {/* Avatar Dropdown - Desktop */}
      {avatarOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-gray-700 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 py-2 z-50 hidden lg:block">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
            <p className="font-medium text-gray-900 dark:text-white">
              {user?.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {user?.email}
            </p>
          </div>

          <div className="py-2">
            <div className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <ThemeSelector />
            </div>
            {avatarMenuItems.map((item) => (
              <NavLink
                key={item.label}
                href={item.href}
                onClick={closeAll}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600
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
                closeAll();
                logout();
              }}
              className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors  text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20`}
            >
              <i
                className={`fa-solid fa-arrow-right-from-bracket w-5 text-red-500`}
              ></i>
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Avatar;
