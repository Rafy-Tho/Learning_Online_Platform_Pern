import { ArrowRightIcon } from "lucide-react";
import { recommended } from "../../pages/LearningDashboard";
import CourseCardGrid from "../CourseCardGrid";

function TopCourse() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Accelerate Your Engineering Career
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Master system design and coding interviews with courses crafted by
            FAANG engineers
          </p>
        </div>
        <CourseCardGrid courses={recommended.slice(0, 4)} />
        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white dark:text-slate-800 font-medium rounded-lg  dark:hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl cursor-pointer">
            View All Courses
            <ArrowRightIcon className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default TopCourse;
