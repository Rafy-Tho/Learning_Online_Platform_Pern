const tabs = [
  { id: "all", label: "All" },
  { id: "courses", label: "Courses" },
  { id: "cloud-labs", label: "Cloud Labs" },
  { id: "projects", label: "Projects" },
  { id: "paths", label: "Paths" },
  { id: "assessments", label: "Assessments" },
  { id: "mock-interviews", label: "Mock Interviews" },
];

export function FilterTab({ activeTab, onTabChange }) {
  return (
    <div className="bg-slate-100 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-4 md:px-8">
      <div className="flex gap-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
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
