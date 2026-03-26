import {
  BookOpen,
  BarChart3,
  Clock,
  Star,
  Bookmark,
  CheckCircle,
  MessageSquare,
  Edit,
} from "lucide-react";
import { Link } from "react-router-dom";

export function CourseCardDetailed({ course }) {
  return (
    <Link
      to={`/courses/1`}
      className="bg-slate-100 dark:bg-slate-900 border border-slate-400 dark:border-slate-800 rounded-lg p-5 md:p-6 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-slate-900/50 transition-shadow block"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-medium rounded">
            <BookOpen className="w-3 h-3" />
            {course.type}
          </span>
          <div className="hidden md:flex items-center gap-3 text-sm text-gray-600 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <BarChart3 className="w-4 h-4" />
              {course.difficulty}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {course.updatedTime}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {course.duration}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {course.rating}
            </span>
          </div>
          <button className="p-1 text-gray-400 hover:text-gray-600 dark:text-slate-500 dark:hover:text-slate-300">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile difficulty/time info */}
      <div className="md:hidden flex flex-wrap gap-2 mb-3 text-xs text-gray-600 dark:text-slate-400">
        <span className="flex items-center gap-1">
          <BarChart3 className="w-3 h-3" />
          {course.difficulty}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {course.updatedTime}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {course.duration}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {course.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-slate-400 mb-4 line-clamp-2">
        {course.description}
      </p>

      {/* Features */}
      <div className="flex flex-wrap gap-3 text-xs md:text-sm text-gray-700 dark:text-slate-300">
        <span className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 dark:bg-slate-800 rounded">
          <CheckCircle className="w-4 h-4" />
          {course.lessons} Lessons
        </span>
        <span className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 dark:bg-slate-800 rounded">
          <Star className="w-4 h-4" />
          {course.features} AI Features
        </span>
        <span className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 dark:bg-slate-800 rounded">
          <MessageSquare className="w-4 h-4" />
          Mock Interviews
        </span>
        <span className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 dark:bg-slate-800 rounded">
          <CheckCircle className="w-4 h-4" />
          {course.quizzes} Quizzes
        </span>
        <span className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 dark:bg-slate-800 rounded">
          <Edit className="w-4 h-4" />
          {course.extras}
        </span>
      </div>
    </Link>
  );
}
