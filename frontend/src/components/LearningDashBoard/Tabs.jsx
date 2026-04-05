// src/components/Tabs.tsx
import { Gamepad2 } from "lucide-react";

export default function Tabs({ tabs, activeTab, onTabChange }) {
  return (
    <nav
      className="mb-8 flex gap-6 overflow-x-auto border-b border-slate-200 pb-0 dark:border-slate-800"
      aria-label="Main"
    >
      {tabs.map((t) => (
        <button
          key={t}
          type="button"
          onClick={() => onTabChange(t)}
          className={`shrink-0 border-b-2 pb-3 text-sm font-medium transition ${
            activeTab === t
              ? "border-indigo-600 font-bold text-indigo-600 dark:border-indigo-400 dark:text-indigo-400"
              : "border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
          }`}
        >
          {t}
        </button>
      ))}
      <button
        type="button"
        className="inline-flex shrink-0 items-center gap-1.5 border-b-2 border-transparent pb-3 text-sm font-medium text-slate-600 dark:text-slate-400"
      >
        <Gamepad2 className="size-4" />
        Coding Challenge
      </button>
    </nav>
  );
}
