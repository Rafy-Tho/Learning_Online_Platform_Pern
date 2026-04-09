// src/components/ActivitySection.tsx
import { Rocket, Star } from "lucide-react";
import useGetExpEarned from "../../hooks/user/useGetExpEarned";
import ErrorMessage from "../../ui/ErrorMessage";
import SpinnerLoader from "../../ui/SpinnerLoader";

export default function ActivitySection() {
  const { data, isPending, error } = useGetExpEarned();
  return (
    <div>
      <h2 className="mb-4 flex items-center gap-2 text-lg font-bold">
        <span className="flex size-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-950/60">
          <Rocket className="size-4 text-indigo-600 dark:text-indigo-400" />
        </span>
        Your Activity
      </h2>
      {error && <ErrorMessage message={error.message} />}
      {isPending && <SpinnerLoader />}
      {!isPending && !error && (
        <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center justify-between">
            <span className="font-bold">Learning Streak</span>
            <a
              href="#"
              className="text-sm font-medium text-indigo-600 dark:text-indigo-400"
            >
              View All
            </a>
          </div>
          <div className="grid grid-cols-1 divide-y divide-slate-200 md:grid-cols-2 md:divide-x md:divide-y-0 dark:divide-slate-700">
            <div className="flex items-center gap-4 pb-6 md:pb-0 md:pr-6">
              <div className="flex size-14 items-center justify-center rounded-full border-2 border-slate-200 dark:border-slate-600">
                <span className="text-orange-500">🔥</span>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {data?.data?.today_xp || 0}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Current Streak
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-6 md:pl-6 md:pt-0">
              <div className="flex size-14 items-center justify-center rounded-full border-2 border-slate-300 dark:border-slate-700">
                <span className="text-lg">
                  <Star className="size-6" color="white" fill="orange" />
                </span>
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {data?.data?.total_xp || 0}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Longest Streak
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
