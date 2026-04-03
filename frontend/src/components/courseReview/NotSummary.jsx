function NotSummary() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-slate-200 dark:border-slate-700 mb-5">
      {/* Simple icon */}
      <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20">
        <svg
          className="w-8 h-8 text-blue-500 dark:text-blue-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </div>

      {/* Text content */}
      <p className="text-base font-medium text-slate-700 dark:text-slate-300">
        No feedback yet
      </p>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Feedback will appear here once available
      </p>
    </div>
  );
}

export default NotSummary;
