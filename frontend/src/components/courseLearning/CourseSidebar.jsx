import { Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import ModuleGroup from "./ModuleGroup";
import useGetCourseLearningData from "../../hooks/course/useGetCourseLearningData";
import SpinnerLoader from "../../ui/SpinnerLoader";
import ErrorMessage from "../../ui/ErrorMessage";
import { useParams } from "react-router-dom";

export function CourseSidebar({ onClose }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [expanded, setExpanded] = useState([]);
  const { data, isPending, error } = useGetCourseLearningData();
  const course = data?.data || {};
  const modules = useMemo(() => course.modules || [], [course.modules]);
  const normalizedSearch = search.toLowerCase();
  const { lessonId } = useParams();
  const hasInitialized = useRef(false);
  const toggle = (id) =>
    setExpanded((prev) =>
      prev.includes(id)
        ? prev.filter((moduleId) => moduleId !== id)
        : [...prev, id],
    );
  const filteredModules = useMemo(() => {
    return modules
      .map((m) => {
        const lessons = (m.lessons || []).filter((l) => {
          const matchSearch = l?.name?.toLowerCase().includes(normalizedSearch);

          const matchFilter = filter === "ALL" || l?.access_type === "FREE";

          return matchSearch && matchFilter;
        });

        return { ...m, lessons };
      })
      .filter((m) => {
        const matchModule = m.name?.toLowerCase().includes(normalizedSearch);

        return matchModule || m.lessons.length > 0;
      });
  }, [modules, normalizedSearch, filter]);

  const freeCount = useMemo(
    () =>
      modules.reduce(
        (a, m) =>
          a + (m.lessons || []).filter((l) => l?.access_type === "FREE").length,
        0,
      ),
    [modules],
  );
  const lessonToModuleMap = useMemo(() => {
    const map = new Map();

    for (const module of modules) {
      for (const lesson of module.lessons || []) {
        map.set(lesson.id, module.id);
      }
    }

    return map;
  }, [modules]);
  const handleFree = () => {
    const freeModules = modules
      .map((m) => ({
        ...m,
        lessons: (m.lessons || []).filter((l) => l?.access_type === "FREE"),
      }))
      .filter((m) => m.lessons.length > 0);

    setExpanded(freeModules.map((m) => m.id));
    setFilter("FREE");
  };
  // Search content
  useEffect(() => {
    if (!search) return;

    setExpanded((prev) => {
      const ids = filteredModules.map((m) => m.id);
      return [...new Set([...prev, ...ids])];
    });
  }, [search, filteredModules]);
  // Expand the lesson lessonId on first render
  useEffect(() => {
    if (hasInitialized.current) return;
    if (!lessonId || lessonToModuleMap.size === 0) return;
    const moduleId = lessonToModuleMap.get(lessonId);
    if (!moduleId) return;
    setExpanded((prev) =>
      prev.includes(moduleId) ? prev : [...prev, moduleId],
    );
    hasInitialized.current = true; // ✅ lock it
  }, [lessonId, lessonToModuleMap]);

  if (isPending) return <SpinnerLoader />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <aside className="flex flex-col h-[calc(100vh-64px)] bg-slate-50 border-r border-slate-200 dark:bg-slate-900 dark:border-slate-800">
      <button
        onClick={onClose}
        className="text-slate-400 dark:text-slate-500 absolute top-3 right-3 text-2xl cursor-pointer lg:hidden"
      >
        <X size={16} />
      </button>
      <div className="p-5 pb-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-4">
          {course.name}
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
            onClick={() => setFilter("ALL")}
            className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
              filter === "ALL"
                ? "border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950 dark:text-blue-300"
                : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            }`}
          >
            All Lessons
          </button>
          <button
            onClick={handleFree}
            className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
              filter === "FREE"
                ? "border-blue-600 bg-blue-50 text-blue-700 dark:border-blue-500 dark:bg-blue-950 dark:text-blue-300"
                : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
            }`}
          >
            Free Lessons ({freeCount})
          </button>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        {filteredModules.map((module, index) => (
          <ModuleGroup
            key={module.id}
            module={module}
            isOpen={expanded.includes(module.id)}
            onToggle={() => toggle(module.id)}
            index={index}
          />
        ))}
      </nav>
    </aside>
  );
}
