import { useState } from "react";
import { Search, ChevronUp, ChevronDown, Circle, Lock } from "lucide-react";
import { courseData } from "../../data/courseData";

export function CourseSidebar({ activeLesson, onSelectLesson }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState({ m1: true, m2: true });

  const toggle = (id) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

  const filteredModules = courseData
    .map((m) => ({
      ...m,
      lessons: m.lessons.filter((l) => {
        const matchSearch = l.title
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchFilter = filter === "all" || l.isFree;
        return matchSearch && matchFilter;
      }),
    }))
    .filter((m) => m.lessons.length > 0);

  const freeCount = courseData.reduce(
    (a, m) => a + m.lessons.filter((l) => l.isFree).length,
    0,
  );

  return (
    <aside className="flex flex-col h-full bg-slate-50 border-r border-slate-200 dark:bg-slate-900 dark:border-slate-800">
      <div className="p-5 pb-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">
          Agentic System Design
        </h2>
        <div className="relative mb-3">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
          />
          <input
            type="text"
            placeholder="Search Content"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-2 pl-9 pr-3 text-sm text-slate-900 dark:text-slate-50 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
              filter === "all"
                ? "border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950 dark:text-blue-300"
                : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            }`}
          >
            All Lessons
          </button>
          <button
            onClick={() => setFilter("free")}
            className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
              filter === "free"
                ? "border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950 dark:text-blue-300"
                : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            }`}
          >
            Free Lessons ({freeCount})
          </button>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {filteredModules.map((mod) => (
          <ModuleGroup
            key={mod.id}
            module={mod}
            isOpen={!!expanded[mod.id]}
            onToggle={() => toggle(mod.id)}
            activeLesson={activeLesson}
            onSelectLesson={onSelectLesson}
          />
        ))}
      </nav>
    </aside>
  );
}

function ModuleGroup({
  module: mod,
  isOpen,
  onToggle,
  activeLesson,
  onSelectLesson,
}) {
  return (
    <div className="mb-1">
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between rounded-md px-2 py-2.5 text-left text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <span>
          {mod.number}. {mod.title}
        </span>
        {isOpen ? (
          <ChevronUp size={16} className="mt-0.5 shrink-0 ml-2" />
        ) : (
          <ChevronDown size={16} className="mt-0.5 shrink-0 ml-2" />
        )}
      </button>
      {isOpen && (
        <ul className="ml-1 mt-0.5 space-y-0.5">
          {mod.lessons.map((lesson) => {
            const active = lesson.id === activeLesson;
            return (
              <li key={lesson.id}>
                <button
                  onClick={() => onSelectLesson(lesson.id)}
                  className={`flex w-full items-start gap-2.5 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    active
                      ? "bg-blue-50 text-blue-700 font-medium dark:bg-blue-950 dark:text-blue-300"
                      : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                  }`}
                >
                  {lesson.isFree ? (
                    <Circle size={14} className="mt-0.5 shrink-0" />
                  ) : (
                    <Lock size={14} className="mt-0.5 shrink-0" />
                  )}
                  <span className="leading-snug">{lesson.title}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
