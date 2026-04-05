// src/components/RecentlyViewed.tsx
import { History } from "lucide-react";
import CourseCard from "../../components/CourseCard";

export default function RecentlyViewed({ courses }) {
  return (
    <section className="mb-14">
      <h2 className="mb-6 flex items-center gap-2 text-lg font-bold">
        <span className="flex size-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-950/60">
          <History className="size-4 text-indigo-600 dark:text-indigo-400" />
        </span>
        Recently Viewed
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((c) => (
          <CourseCard key={c.title} course={c} />
        ))}
      </div>
    </section>
  );
}
