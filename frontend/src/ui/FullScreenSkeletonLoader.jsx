const FullScreenSkeletonLoader = () => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 z-50 overflow-auto">
      <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
        {/* Header Skeleton */}
        <div className="mb-8">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mb-4"></div>
          <div className="h-4 w-96 max-w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 animate-pulse"
            >
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
              <div className="h-8 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>

        {/* Chart Skeleton */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-8 animate-pulse">
          <div className="h-6 w-40 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>

        {/* Table Skeleton */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden animate-pulse">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900/50">
                <tr>
                  {[...Array(5)].map((_, i) => (
                    <th key={i} className="px-6 py-3 text-left">
                      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, i) => (
                  <tr
                    key={i}
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    {[...Array(5)].map((_, j) => (
                      <td key={j} className="px-6 py-4">
                        <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded max-w-[200px]"></div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullScreenSkeletonLoader;
