import { useNavigate, useParams } from "react-router-dom";
import { useLessonNavigation } from "../../hooks/course/useLessonNavigation";

function NextPrevious() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { currentLessonIndex, totalLessons, prevLessonId, nextLessonId } =
    useLessonNavigation();

  const goToNextPage = () => {
    if (nextLessonId) navigate(`/courses/${courseId}/lessons/${nextLessonId}`);
  };

  const goToPrevPage = () => {
    if (prevLessonId) navigate(`/courses/${courseId}/lessons/${prevLessonId}`);
  };
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 py-6 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 mt-8">
      <button
        onClick={goToPrevPage}
        disabled={!prevLessonId}
        className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 w-full sm:w-auto justify-center
                  ${
                    prevLessonId
                      ? "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600"
                      : "bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
                  }
                `}
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Previous
      </button>

      <div className="text-sm text-slate-500 dark:text-slate-400 font-medium px-3 py-1 bg-slate-50 dark:bg-slate-700/50 rounded-full sm:bg-transparent sm:dark:bg-transparent">
        Lesson {currentLessonIndex + 1} of {totalLessons}
      </div>

      <button
        onClick={goToNextPage}
        disabled={!nextLessonId}
        className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 w-full sm:w-auto justify-center
                  ${
                    nextLessonId
                      ? "bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700"
                      : "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-600 cursor-not-allowed"
                  }
                `}
      >
        Next
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}

export default NextPrevious;
