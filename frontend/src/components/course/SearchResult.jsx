import { CourseCard } from "./courseCard";

export function SearchResult({ results, totalCount }) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 md:p-8">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Search Results ({totalCount})
        </h2>

        <div className="space-y-4 md:space-y-5">
          {results.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
    </div>
  );
}
