// hooks/course/useLessonNavigation.js
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import useGetCourseLearningData from "./useGetCourseLearningData";

export function useLessonNavigation() {
  const { lessonId } = useParams();
  const { data } = useGetCourseLearningData();

  const flatLessons = useMemo(() => {
    const modules = data?.data?.modules || [];
    return modules.flatMap((m) => m.lessons || []);
  }, [data]);
  const currentIndex = flatLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = flatLessons[currentIndex - 1] ?? null;
  const nextLesson = flatLessons[currentIndex + 1] ?? null;
  return {
    currentLessonIndex: currentIndex,
    totalLessons: flatLessons.length,
    prevLessonId: prevLesson?.id ?? null,
    nextLessonId: nextLesson?.id ?? null,
    isPrevQuiz: prevLesson?.type === "QUIZ",
    isNextQuiz: nextLesson?.type === "QUIZ",
  };
}
