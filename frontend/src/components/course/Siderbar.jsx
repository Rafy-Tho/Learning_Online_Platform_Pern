"use client";

import { Filter, Search } from "lucide-react";

const filterByOptions = ["New Only", "Free"];
const skillLevelOptions = ["Beginner", "Intermediate", "Advanced"];
const topicOptions = [
  "System Design",
  "Python",
  "AWS",
  "Java",
  "SQL",
  "Interview Prep",
  ".NET",
  "A-frame",
];

export function Sidebar({ filters, onFilterChange, onShowMoreTopics }) {
  return (
    <div className="w-full md:w-64 bg-slate-100 dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 p-4 md:p-6 flex flex-col gap-6">
      {/* Filter Header */}
      <div className="flex items-center gap-2">
        <Filter className="w-5 h-5 text-gray-900 dark:text-white" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Filters
        </h2>
      </div>

      {/* Filter By Section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Filter By
        </h3>
        <div className="space-y-3">
          {filterByOptions.map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="filterBy"
                value={option}
                checked={filters.filterBy.includes(option)}
                onChange={(e) =>
                  onFilterChange("filterBy", option, e.target.checked)
                }
                className="w-4 h-4 text-blue-600 dark:text-blue-400 cursor-pointer"
              />
              <span className="text-sm text-gray-600 dark:text-slate-400 group-hover:text-gray-900 dark:group-hover:text-slate-200">
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Skill Level Section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Skill Level
        </h3>
        <div className="space-y-3">
          {skillLevelOptions.map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="skillLevel"
                value={option}
                checked={filters.skillLevel.includes(option)}
                onChange={(e) =>
                  onFilterChange("skillLevel", option, e.target.checked)
                }
                className="w-4 h-4 text-blue-600 dark:text-blue-400 cursor-pointer"
              />
              <span className="text-sm text-gray-600 dark:text-slate-400 group-hover:text-gray-900 dark:group-hover:text-slate-200">
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Topics Section */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Topics
        </h3>
        <div className="space-y-3">
          {topicOptions.map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                value={option}
                checked={filters.topics.includes(option)}
                onChange={(e) =>
                  onFilterChange("topics", option, e.target.checked)
                }
                className="w-4 h-4 text-blue-600 dark:text-blue-400 rounded cursor-pointer"
              />
              <span className="text-sm text-gray-600 dark:text-slate-400 group-hover:text-gray-900 dark:group-hover:text-slate-200">
                {option}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Show More Topics Button */}
      <button
        onClick={onShowMoreTopics}
        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium text-left"
      >
        Show more (373)
      </button>
    </div>
  );
}
