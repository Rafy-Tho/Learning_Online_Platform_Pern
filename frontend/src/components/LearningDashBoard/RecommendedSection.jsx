// src/components/RecommendedSection.tsx
import { ArrowUpRight } from "lucide-react";
import { SwiperSlide } from "swiper/react";

import useGetRecommendedCourse from "../../hooks/course/useGetRecommendedCourse";
import ErrorMessage from "../../ui/ErrorMessage";
import SpinnerLoader from "../../ui/SpinnerLoader";
import SwiperWrapper from "../SwiperWrapper";
import CourseCard from "../CourseCard";
import { Link } from "react-router-dom";

export default function RecommendedSection() {
  const { data, isPending, error } = useGetRecommendedCourse();
  const courses = data?.data || [];
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
      {error && <ErrorMessage message={error.message} />}
      {isPending && <SpinnerLoader />}
      {!isPending && courses.length > 0 && (
        <SwiperWrapper>
          {courses.map((course) => (
            <SwiperSlide key={course.id}>
              <CourseCard course={course} />
            </SwiperSlide>
          ))}
        </SwiperWrapper>
      )}
      <div className="mt-8 flex justify-center">
        <Link
          to="/courses"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          type="button"
          className="rounded-lg bg-indigo-600 px-8 py-3 font-semibold text-white hover:bg-indigo-700 cursor-pointer block"
        >
          Explore All
        </Link>
      </div>
    </section>
  );
}
