import { useState } from "react";
import { FilterTab } from "../components/course/FilterTap";
import { SearchHeader } from "../components/course/SearchHeader";
import { SearchResult } from "../components/course/SearchResult";
import { Sidebar } from "../components/course/Siderbar";
import { TopicsModal } from "../components/course/TopicModal";
import mockCourses from "../data/mockCourse";

export default function CourseScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("courses");
  const [showTopicsModal, setShowTopicsModal] = useState(false);
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [filters, setFilters] = useState({
    filterBy: [],
    skillLevel: [],
    topics: [],
  });

  const handleFilterChange = (category, value, checked) => {
    setFilters((prev) => {
      const current = prev[category];
      if (checked) {
        return {
          ...prev,
          [category]: [...current, value],
        };
      } else {
        return {
          ...prev,
          [category]: current.filter((item) => item !== value),
        };
      }
    });
  };

  const handleApplyTopics = (topics) => {
    setFilters((prev) => ({
      ...prev,
      topics,
    }));
  };

  return (
    <div className="h-screen bg-slate-100 dark:bg-slate-900 flex flex-col max-w-7xl mx-auto">
      {/* Fixed Header Section */}
      <div className="sticky top-0 z-30 bg-slate-100 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800">
        {/* Search Header */}
        <SearchHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          showMobileFilter={showMobileFilter}
          setShowMobileFilter={setShowMobileFilter}
        />

        {/* Filter Tabs */}
        <FilterTab activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar - Fixed on desktop, hidden on mobile */}
        <div className="hidden md:flex w-64 flex-shrink-0 sticky top-0 h-[calc(100vh-180px)] overflow-y-auto">
          <Sidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            onShowMoreTopics={() => setShowTopicsModal(true)}
          />
        </div>

        {/* Mobile Filter Overlay */}
        {showMobileFilter && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setShowMobileFilter(false)}
          />
        )}

        {/* Mobile Sidebar - Slide in from left on mobile */}
        <div
          className={`fixed left-0 top-0 h-full w-64 bg-slate-100 dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
            showMobileFilter ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="pt-20">
            <Sidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onShowMoreTopics={() => setShowTopicsModal(true)}
            />
          </div>
        </div>

        {/* Results Container */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <SearchResult results={mockCourses} totalCount={1006} />
        </div>
      </div>

      {/* Topics Modal */}
      <TopicsModal
        isOpen={showTopicsModal}
        onClose={() => setShowTopicsModal(false)}
        selectedTopics={filters.topics}
        onApply={handleApplyTopics}
      />
    </div>
  );
}
