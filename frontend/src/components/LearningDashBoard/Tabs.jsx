// src/components/Tabs.tsx
import { Gamepad2 } from "lucide-react";
import { NavLink } from "react-router-dom";
const tabs = [
  { label: "Home", href: "/learning-dashboard" },
  { label: "Recently Viewed", href: "/learning-dashboard/recently-viewed" },
  { label: "In Progress", href: "/learning-dashboard/in-progress" },
  { label: "Saved", href: "/learning-dashboard/saved" },
  { label: "Completed", href: "/learning-dashboard/completed" },
];
export default function Tabs() {
  return (
    <nav
      className="mb-8 flex gap-6 overflow-x-auto border-b border-slate-200 pb-0 dark:border-slate-800"
      aria-label="Main"
    >
      {tabs.map((t) => (
        <NavLink
          key={t.label}
          to={t.href}
          className={({ isActive }) =>
            `${
              isActive
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
            } whitespace-nowrap px-1 pb-3 text-sm font-medium transition-colors`
          }
        >
          {t.label}
        </NavLink>
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
