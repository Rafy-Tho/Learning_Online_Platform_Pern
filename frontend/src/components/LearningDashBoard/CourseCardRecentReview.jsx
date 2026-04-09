import { BookOpen, Bookmark, Clock, BarChart2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import truncateText from "../../utils/truncateText";
import formatMinutes from "../../utils/formatMinutes";
import formatCapitalize from "../../utils/formatCapitalize";
function CourseCardRecentReview({ course }) {
  const navigate = useNavigate();
  return (
    <article
      className="flex shrink-0 flex-col rounded-xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900 h-full w-full cursor-pointer"
      onClick={() =>
        navigate(`/courses/${course.id}/lessons/${course.last_lesson}`)
      }
    >
      <div className="mb-4 flex items-start justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 ">
          <BookOpen className="size-3.5" aria-hidden />
          Course
        </span>
        <button
          type="button"
          className="text-slate-400 transition hover:text-indigo-600 dark:text-slate-500 cursor-pointer"
          aria-label="Bookmark"
          onClick={(e) => {
            e.stopPropagation();
            // toggle bookmark logic here
          }}
        >
          <Bookmark className="size-5" />
        </button>
      </div>

      <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-slate-100">
        {course.name}
      </h3>
      <p className="mb-6 line-clamp-4 flex-1 text-sm text-slate-600 dark:text-slate-400">
        {truncateText(course.description, 150)}
      </p>

      <div className="mt-auto flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3.5" />
          {formatMinutes(course.total_duration)}
        </span>
        <span className="inline-flex items-center gap-1">
          <BarChart2 className="size-3.5" />
          {formatCapitalize(course.level)}
        </span>
      </div>
    </article>
  );
}

export default CourseCardRecentReview;
