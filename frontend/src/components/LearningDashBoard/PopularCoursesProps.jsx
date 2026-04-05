// src/components/PopularCourses.tsx
import { ArrowUpRight } from "lucide-react";
import { SwiperSlide } from "swiper/react";
import CourseCard from "../../components/CourseCard";
import SwiperWrapper from "../../components/SwiperWrapper";

export default function PopularCourses({ courses }) {
  return (
    <section className="mb-14">
      <h2 className="mb-6 flex items-center gap-2 text-lg font-bold">
        <span className="flex size-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-950/60">
          <ArrowUpRight className="size-4 text-indigo-600 dark:text-indigo-400" />
        </span>
        Most Popular Courses
      </h2>
      <SwiperWrapper>
        {courses.map((c) => (
          <SwiperSlide key={c.title}>
            <CourseCard course={c} />
          </SwiperSlide>
        ))}
      </SwiperWrapper>
    </section>
  );
}
