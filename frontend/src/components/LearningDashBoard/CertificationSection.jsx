// src/components/CertificationSection.tsx
import { Award, Lock } from "lucide-react";

export default function CertificationSection() {
  return (
    <div>
      <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
        <span className="flex size-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-950/60">
          <Award className="size-4 text-indigo-600 dark:text-indigo-400" />
        </span>
        Certification
      </h2>
      <div className="flex flex-col gap-6 rounded-xl border border-slate-200 bg-white p-6 md:flex-row md:items-center dark:border-slate-800 dark:bg-slate-900">
        <div className="flex h-32 w-full shrink-0 items-center justify-center rounded-lg border-2 border-dashed border-indigo-300 bg-slate-50 dark:border-indigo-700 dark:bg-slate-800/50 md:w-40">
          <Lock className="size-10 text-slate-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold">
            Your certificate is waiting. Don&apos;t delay!
          </h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Accelerate your career with an Educative Certification
          </p>
        </div>
        <button
          type="button"
          className="shrink-0 rounded-lg border-2 border-purple-600 px-4 py-2 font-medium text-purple-600 dark:border-purple-400 dark:text-purple-400"
        >
          Explore
        </button>
      </div>
    </div>
  );
}
