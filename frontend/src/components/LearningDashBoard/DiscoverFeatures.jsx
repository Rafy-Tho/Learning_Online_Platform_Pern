// src/components/DiscoverFeatures.tsx
import { Search, UserCheck, FlaskConical, Code2 } from "lucide-react";

const features = [
  {
    tag: "Mock Interview",
    icon: UserCheck,
    cls: "bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400",
    text: "Practice technical interviews with guided scenarios and feedback.",
  },
  {
    tag: "Cloud Labs",
    icon: FlaskConical,
    cls: "bg-purple-50 text-purple-600 dark:bg-purple-950/40 dark:text-purple-400",
    text: "Hands-on cloud environments to experiment safely at scale.",
  },
  {
    tag: "Projects",
    icon: Code2,
    cls: "bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400",
    text: "Ship portfolio-ready projects with structured milestones.",
  },
];

export default function DiscoverFeatures() {
  return (
    <section>
      <h2 className="mb-6 flex items-center gap-2 text-lg font-bold">
        <span className="flex size-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-950/60">
          <Search className="size-4 text-indigo-600 dark:text-indigo-400" />
        </span>
        Discover More Features
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {features.map((f) => (
          <div
            key={f.tag}
            className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
          >
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${f.cls}`}
            >
              <f.icon className="size-3.5" />
              {f.tag}
            </span>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              {f.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
