import { Filter, Search } from "lucide-react";

export function SearchHeader({
  searchQuery,
  onSearchChange,
  showMobileFilter,
  setShowMobileFilter,
}) {
  return (
    <div className="bg-slate-100 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-4 md:px-8 py-6 ">
      <div className="flex items-center gap-3  border border-gray-300 dark:border-slate-700 rounded-4xl px-5 py-4">
        <Search className="w-5 h-5 text-gray-400 dark:text-slate-600 shrink-0" />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-600 text-sm focus:outline-none flex-1"
        />

        <button
          onClick={() => setShowMobileFilter(!showMobileFilter)}
          className="text-sm text-gray-400 dark:text-slate-600 shrink-0 md:hidden"
        >
          <Filter className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
