import { Link, useLocation } from "react-router-dom";

function LoginSignupBtn() {
  const location = useLocation();

  const isLoginActive = location.pathname === "/login";
  const isSignupActive = location.pathname === "/signup";

  return (
    <div className="flex items-center gap-3">
      <Link
        to="/login"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
          isLoginActive
            ? "text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20"
            : "text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
        }`}
      >
        Login
      </Link>

      <Link
        to="/signup"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200 hidden sm:block ${
          isSignupActive
            ? "bg-blue-500 text-white ring-2 ring-blue-300 dark:ring-blue-300"
            : "bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-400 text-white shadow-md hover:shadow-lg"
        }`}
      >
        Sign up
      </Link>
    </div>
  );
}

export default LoginSignupBtn;
