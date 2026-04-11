import {
  ChevronDown,
  ChevronUp,
  Circle,
  CircleQuestionMark,
  Lock,
} from "lucide-react";
import { NavLink, useParams } from "react-router-dom";

function ModuleGroup({ module, isOpen, onToggle, index }) {
  const { courseId } = useParams();
  const lessonIcons = {
    TEXT: Circle,
    QUIZ: CircleQuestionMark,
  };
  return (
    <div className="mb-1">
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between rounded-md px-2 py-2.5 text-left text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      >
        <span>
          {index + 1}. {module.name}
        </span>
        {isOpen ? (
          <ChevronUp size={16} className="mt-0.5 shrink-0 ml-2" />
        ) : (
          <ChevronDown size={16} className="mt-0.5 shrink-0 ml-2" />
        )}
      </button>
      {isOpen && (
        <ul className="ml-1 mt-0.5 space-y-0.5">
          {module.lessons.map((lesson) => {
            const Icon = lessonIcons[lesson.type] || Circle;
            const isLocked = lesson.access_type === "SUBSCRIPTION";
            const isQuiz = lesson.type === "QUIZ";
            const link = isLocked
              ? "/pricing"
              : isQuiz
                ? `/courses/${courseId}/lessons/${lesson.id}/quiz`
                : `/courses/${courseId}/lessons/${lesson.id}`;
            return (
              <li key={lesson.id}>
                <NavLink
                  to={link}
                  className={({ isActive }) => `
                     flex w-full items-start gap-2.5 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                       isActive
                         ? "bg-blue-50 text-blue-700 font-medium dark:bg-blue-950 dark:text-blue-300"
                         : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-100"
                     }`}
                >
                  {!isLocked ? (
                    <Icon size={14} className="mt-0.5 shrink-0" />
                  ) : (
                    <Lock size={14} className="mt-0.5 shrink-0" />
                  )}
                  <span className="leading-snug">{lesson.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default ModuleGroup;
