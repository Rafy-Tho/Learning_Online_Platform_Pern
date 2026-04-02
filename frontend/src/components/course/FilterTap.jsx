import { useSearchParams } from "react-router-dom";
import useGetCategories from "../../hooks/course/useGetCategories";
import SpinnerLoader from "../../ui/SpinnerLoader";
import ErrorMessage from "../../ui/ErrorMessage";

const all = { id: "all", name: "All" };
export function FilterTab() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isPending, error } = useGetCategories();
  const tabs = [all, ...(data?.data || [])];
  const activeTab = searchParams.get("category") || "all";
  const handleClick = (tab) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tab.id === "all") params.delete("category");
    else params.set("category", tab.id);
    params.delete("page");
    params.delete("limit");
    setSearchParams(params);
  };
  if (isPending) return <SpinnerLoader />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <div className="bg-slate-100 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-4 md:px-8">
      <div className="flex gap-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleClick(tab)}
            className={`px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
              activeTab === tab.id
                ? "border-blue-600 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-200"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>
    </div>
  );
}
