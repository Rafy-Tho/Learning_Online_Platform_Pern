import { Filter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function SearchHeader({ setShowMobileFilter, showMobileFilter }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("search") || "",
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;
    const params = new URLSearchParams(searchParams);
    params.delete("page");
    params.delete("limit");
    params.set("search", searchQuery);
    setSearchParams(params);
  };
  useEffect(() => {
    if (searchQuery.trim() !== "") return;
    const params = new URLSearchParams(searchParams);
    params.delete("search");
    params.delete("page");
    params.delete("limit");
    setSearchParams(params);
  }, [searchQuery, searchParams, setSearchParams]);
  return (
    <form
      onSubmit={handleSearch}
      className="bg-slate-100 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-4 md:px-8 py-6 flex flex-col md:flex-row justify-between gap-3
   "
    >
      <div className="flex items-center gap-3 border border-gray-300 dark:border-slate-700 rounded-4xl px-5 py-4 flex-1">
        <Search className="w-5 h-5 text-gray-400 dark:text-slate-600 shrink-0" />
        <input
          type="search"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-600 text-sm focus:outline-none flex-1"
        />

        <button
          onClick={() => setShowMobileFilter(!showMobileFilter)}
          className="text-sm text-gray-400 dark:text-slate-600 shrink-0 md:hidden"
        >
          <Filter className="w-4 h-4" />
        </button>
      </div>

      <button
        type="submit"
        className="text-sm text-white dark:text-white shrink-0 bg-slate-400 hover:bg-slate-500 dark:bg-slate-600 dark:hover:bg-slate-500 rounded-full px-6 py-2 font-medium transition-all duration-200 ease-in-out shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-700 active:scale-95 cursor-pointer"
      >
        Apply
      </button>
    </form>
  );
}
