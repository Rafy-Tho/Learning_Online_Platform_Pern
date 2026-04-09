// src/components/RecentlyViewed.tsx
import { History } from "lucide-react";
import CourseCardProgress from "../components/LearningDashBoard/CourseCardProgress";
import useGetCourseInProgress from "../hooks/course/useGetCourseInProgress";
import ErrorMessage from "../ui/ErrorMessage";
import SpinnerLoader from "../ui/SpinnerLoader";
import Pagination from "../components/Pagination";

export default function InprogressDashboard() {
  const { data, isPending, error } = useGetCourseInProgress();
  const courses = data?.data?.data || [];
  const pagination = data?.data?.pagination || {};
  if (isPending) return <SpinnerLoader />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <section className="mb-14">
      <h2 className="mb-6 flex items-center gap-2 text-lg font-bold">
        <span className="flex size-9 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-950/60">
          <History className="size-4 text-indigo-600 dark:text-indigo-400" />
        </span>
        In Progress
      </h2>
      {courses.length === 0 && (
        <div className="text-center text-gray-500 dark:text-gray-400">
          No in progress courses.
        </div>
      )}
      {courses.length > 0 && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map((course) => (
            <CourseCardProgress key={course.id} course={course} />
          ))}
        </div>
      )}
      {Number(pagination?.totalPages) > 1 && (
        <Pagination
          totalItems={Number(pagination?.totalItems)}
          itemsPerPage={Number(pagination?.limit)}
          siblingCount={1}
          showFirstLast={true}
          showPrevNext={true}
        />
      )}
    </section>
  );
}
