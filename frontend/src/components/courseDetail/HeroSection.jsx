import { ArrowDownIcon, BookOpen, Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import useGetCourseDetails from "../../hooks/course/useGetCourseDetails";
import ErrorMessage from "../../ui/ErrorMessage";
import SpinnerLoader from "../../ui/SpinnerLoader";
import formatMinutes from "../../utils/formatMinutes";
import formatTimeAgo from "../../utils/formatTimeAgo";
import RatingStars from "../RatingStars";

export default function HeroSection({ scrollToSection }) {
  const { data, isPending, error } = useGetCourseDetails();
  if (isPending) return <SpinnerLoader />;
  if (error) return <ErrorMessage message={error.message} />;
  const course = data?.data || {};
  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-b-[3rem] pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {course?.name || ""}
          </h1>
          <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-4xl mx-auto mb-8 px-4">
            {course?.description || ""}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-8 text-sm sm:text-base">
            <div className="flex items-center gap-1">
              <div className="flex">
                <RatingStars rating={course?.rating || 0} />
              </div>
              <span className="ml-1 text-gray-700 dark:text-gray-300 font-medium">
                {course?.rating || 0}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
              <span>{course?.total_lessons || 0} Lessons</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
              <span> Updated {formatTimeAgo(course?.updated_at || "")}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
              <span>{formatMinutes(course?.total_duration || 0)}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              to={`/courses/${course?.id}/lessons`}
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white px-8 py-3 rounded-lg font-medium transition-colors block"
            >
              Start Learning
            </Link>
            <button
              onClick={scrollToSection}
              className="w-full sm:w-auto border-2 border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-800 px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              Course Content
              <ArrowDownIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
