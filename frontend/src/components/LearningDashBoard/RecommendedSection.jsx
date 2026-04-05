// src/components/RecommendedSection.tsx
import { ArrowUpRight } from "lucide-react";
import { SwiperSlide } from "swiper/react";
import CourseCard from "../../components/CourseCard";
import SwiperWrapper from "../../components/SwiperWrapper";

export default function RecommendedSection({ courses }) {
  return (
    <section className="mb-14">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="flex items-center gap-2 text-lg font-bold">
          <span className="flex size-9 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-950/60">
            <ArrowUpRight className="size-4 text-indigo-600 dark:text-indigo-400" />
          </span>
          Recommended For You
        </h2>
        <button
          type="button"
          className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-indigo-600 dark:border-slate-600 dark:text-indigo-400"
        >
          Learning Preferences
        </button>
      </div>
      <SwiperWrapper>
        {courses.map((c) => (
          <SwiperSlide key={c.title}>
            <CourseCard course={c} />
          </SwiperSlide>
        ))}
      </SwiperWrapper>
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          className="rounded-lg bg-indigo-600 px-8 py-3 font-semibold text-white hover:bg-indigo-700"
        >
          Explore All
        </button>
      </div>
    </section>
  );
}
