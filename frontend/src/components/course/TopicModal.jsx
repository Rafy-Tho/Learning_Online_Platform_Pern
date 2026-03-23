"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";

const allTopics = [
  "System Design",
  "Python",
  "AWS",
  "Java",
  "SQL",
  "Interview Prep",
  ".NET",
  "A2A",
  "API",
  "API-Football",
  "ASP.NET Core",
  "Absinthe",
  "A-frame",
  "AI Agent",
  "API Gateway",
  "ASP.NET",
  "AWS CLI",
  "AccuWeather API",
];

export function TopicsModal({ isOpen, onClose, selectedTopics, onApply }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState(selectedTopics);

  const filteredTopics = allTopics.filter((topic) =>
    topic.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleTopic = (topic) => {
    setSelected((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic],
    );
  };

  const handleApply = () => {
    onApply(selected);
    onClose();
  };

  const handleClearAll = () => {
    setSelected([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/5 dark:bg-black/5 bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-w-2xl max-h-96 overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Filter by Topics
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search */}
        <div className="sticky top-14 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 px-6 py-4">
          <div className="flex items-center gap-3 bg-gray-50 dark:bg-slate-800 rounded-lg px-3 py-2">
            <Search className="w-5 h-5 text-gray-400 dark:text-slate-600" />
            <input
              type="text"
              placeholder="Search topics"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-slate-500 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Topics Grid */}
        <div className="flex-1 px-6 py-4 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            {filteredTopics.map((topic) => (
              <label
                key={topic}
                className="flex items-center gap-3 cursor-pointer group p-2 rounded hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(topic)}
                  onChange={() => toggleTopic(topic)}
                  className="w-4 h-4 text-blue-600 dark:text-blue-400 rounded cursor-pointer"
                />
                <span className="text-sm text-gray-700 dark:text-slate-300">
                  {topic}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Footer with Buttons */}
        <div className="sticky bottom-0 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 px-6 py-4 flex gap-3 justify-end">
          <button
            onClick={handleClearAll}
            className="px-4 py-2 text-gray-700 dark:text-slate-300 font-medium rounded border border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={handleApply}
            className="px-6 py-2 bg-blue-600 dark:bg-blue-600 text-white font-medium rounded hover:bg-blue-700 dark:hover:bg-blue-700 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
