import {
  Award,
  ChevronDown,
  ChevronUp,
  Circle,
  CircleQuestionMark,
  Lock,
  Search,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import useGetCourseLearningData from "../../hooks/course/useGetCourseLearningData";
import ErrorMessage from "../../ui/ErrorMessage";
import SpinnerLoader from "../../ui/SpinnerLoader";
import { Link } from "react-router-dom";
import useGetCourseProgress from "../../hooks/course/useGetCourseProgress";
import useCreateCourseProgress from "../../hooks/course/useCreateCourseProgress";
export default function LearningRoadmap({ sectionRef }) {
  const [expandedSections, setExpandedSections] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { data: progress } = useGetCourseProgress();
  const { mutate } = useCreateCourseProgress();
  const { data, isPending, error } = useGetCourseLearningData();
  const course = data?.data || {};
  const modules = useMemo(() => course?.modules || [], [course.modules]);
  const filteredModules = useMemo(
    () =>
      modules
        .map((module) => {
          const filteredLessons = module.lessons.filter((lesson) =>
            lesson?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
          );

          return {
            ...module,
            lessons: filteredLessons,
          };
        })
        .filter((module) => {
          return (
            module?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            module?.lessons.length > 0
          );
        }),
    [modules, searchQuery],
  );
  const toggleSection = (id) => {
    setExpandedSections((prev) =>
      prev.includes(id)
        ? prev.filter((moduleId) => moduleId !== id)
        : [...prev, id],
    );
  };

  const toggleExpandAll = () => {
    const target = searchQuery ? filteredModules : modules;

    const allExpanded = target.every((m) => expandedSections.includes(m.id));

    if (allExpanded) setExpandedSections([]);
    else setExpandedSections(target.map((m) => m.id));
  };
  const handleProgress = () => {
    if (progress?.data) return;
    mutate();
  };
  useEffect(() => {
    if (!searchQuery) return;
    setExpandedSections((prev) => {
      const ids = filteredModules.map((m) => m.id);
      return [...new Set([...prev, ...ids])];
    });
  }, [searchQuery, filteredModules]);

  if (isPending) return <SpinnerLoader />;
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <div ref={sectionRef} className="max-w-6xl mx-auto  py-12 sm:py-16">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              Learning Roadmap
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {`${course?.total_lessons} Lessons • ${course?.total_quizzes} Quizzes`}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search Lessons"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={toggleExpandAll}
            className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            <span className="text-sm font-medium dark:text-white">
              Expand All
            </span>
            {expandedSections.length > 0 ? (
              <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            )}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredModules.map((module, index) => (
          <div
            key={module.id}
            className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800"
          >
            <button
              onClick={() => toggleSection(module.id)}
              className="w-full px-6 py-5 flex items-start justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex-1 text-left">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-slate-100 mb-2">
                  {index + 1}. {module.name}
                </h3>
                {module.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 pr-4">
                    {module.description}
                  </p>
                )}
              </div>
              <div className="shrink-0 ml-4">
                {expandedSections.includes(module.id) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                )}
              </div>
            </button>

            {expandedSections.includes(module.id) && (
              <div className="px-6 pb-5 space-y-3">
                {module.lessons.map((lesson, index) => {
                  const lessonIcons = {
                    TEXT: Circle,
                    QUIZ: CircleQuestionMark,
                  };
                  const Icon = lessonIcons[lesson.type] || Circle;

                  const isLocked = lesson.access_type === "SUBSCRIPTION";
                  return (
                    <Link
                      key={index}
                      onClick={handleProgress}
                      to={`/courses/${course.id}/lessons/${lesson.id}`}
                      className="flex items-center gap-3 py-2 text-sm sm:text-base"
                    >
                      {isLocked ? (
                        <Lock className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0 " />
                      ) : (
                        <Icon className="w-4 h-4 text-gray-900 dark:text-white shrink-0 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors" />
                      )}

                      <span
                        className={
                          isLocked
                            ? "text-gray-500 dark:text-gray-400"
                            : "text-gray-900 dark:text-white cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        }
                      >
                        {lesson.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 border border-indigo-200 dark:border-indigo-900 rounded-xl p-6 sm:p-8 bg-white dark:bg-gray-800">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Certificate of Completion
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Showcase your accomplishment by sharing your certificate of
              completion.
            </p>
            <button className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg text-gray-500 dark:text-gray-400 text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer">
              Claim Certificate
            </button>
          </div>
          <div className="w-full lg:w-64 h-48 border-2 border-indigo-300 dark:border-indigo-800 rounded-lg bg-gradient-to-br from-indigo-50 dark:from-gray-700 to-purple-50 dark:to-gray-700 flex items-center justify-center">
            <div className="text-center">
              <Lock className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
              <p className="text-xs text-gray-400 dark:text-gray-500">
                Certificate Preview
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
