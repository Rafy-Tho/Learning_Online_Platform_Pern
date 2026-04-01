import { useSearchParams } from "react-router-dom";

const tabs = [
  { id: "all", label: "All" },
  { id: "programming", label: "Programming" },
  { id: "design", label: "Design" },
  { id: "network", label: "Network" },
  { id: "cybersecurity", label: "Cybersecurity" },
  { id: "mobile", label: "Mobile Development" },
  { id: "web", label: "Web Development" },
];

export function FilterTab() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("category") || "all";
  const handleClick = (tab) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tab.id === "all") params.delete("category");
    else params.set("category", tab.id);
    setSearchParams(params);
  };
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
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
