// src/components/RecentlyViewed.tsx
import { History } from "lucide-react";
import useGetRecentlyViewedCourses from "../hooks/course/useGetRecentlyViewedCourses";
import ErrorMessage from "../ui/ErrorMessage";
import SpinnerLoader from "../ui/SpinnerLoader";
import CourseCardRecentReview from "../components/LearningDashBoard/CourseCardRecentReview";

export default function RecentViewDashboard() {
  const { data, isPending, error } = useGetRecentlyViewedCourses();
  const courses = data?.data || [];
  if (isPending) return <SpinnerLoader />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <section className="mb-14">
      <h2 className="mb-6 flex items-center gap-2 text-lg font-bold">
        <span className="flex size-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-950/60">
          <History className="size-4 text-indigo-600 dark:text-indigo-400" />
        </span>
        Recently Viewed
      </h2>
      {courses.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400">
          No recently viewed courses.
        </div>
      )}
      {courses.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map((course) => (
            <CourseCardRecentReview key={course.id} course={course} />
          ))}
        </div>
      )}
    </section>
  );
}
