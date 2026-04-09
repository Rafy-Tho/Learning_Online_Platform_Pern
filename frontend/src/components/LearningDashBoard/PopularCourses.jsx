// src/components/PopularCourses.tsx
import { ArrowUpRight } from "lucide-react";
import { SwiperSlide } from "swiper/react";
import CourseCard from "../CourseCard";
import SwiperWrapper from "../SwiperWrapper";
import useGetPopularCourse from "../../hooks/course/useGetPopularCourse";
import SpinnerLoader from "../../ui/SpinnerLoader";
import ErrorMessage from "../../ui/ErrorMessage";

export default function PopularCourses() {
  const { data, isPending, error } = useGetPopularCourse();
  const courses = data?.data || [];
  return (
    <section className="mb-14">
      <h2 className="mb-6 flex items-center gap-2 text-lg font-bold">
        <span className="flex size-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-950/60">
          <ArrowUpRight className="size-4 text-indigo-600 dark:text-indigo-400" />
        </span>
        Most Popular Courses
      </h2>
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
    </section>
  );
}
