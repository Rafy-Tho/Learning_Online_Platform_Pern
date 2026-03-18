import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 with illustration */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-indigo-500/10 dark:bg-indigo-400/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative">
            <h1 className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              404
            </h1>

            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-indigo-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-purple-500 rounded-full opacity-20 animate-pulse animation-delay-1000"></div>
          </div>
        </div>

        {/* Error message */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
            Page Not Found
          </h2>

          <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have
            been moved or doesn't exist.
          </p>

          {/* Illustration */}
          <div className="flex justify-center gap-2 my-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to Home
          </Link>

          <Link
            to="/contact"
            className="px-8 py-3 border-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 font-medium rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Contact Support
          </Link>
        </div>

        {/* Help link */}
        <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          Need help? Check our{" "}
          <Link
            to="/faq"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            FAQ section
          </Link>{" "}
          or{" "}
          <Link
            to="/help"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            help center
          </Link>
        </p>
      </div>
    </div>
  );
}
