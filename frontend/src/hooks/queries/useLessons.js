import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { lessonsApi } from "../../api/lessons";

export function useLessonContent() {
  const { lessonId } = useParams();
  return useQuery({
    queryKey: ["lesson-content", lessonId],
    queryFn: () => lessonsApi.getContent(lessonId),
    enabled: !!lessonId,
  });
}

export function useQuizzes() {
  const { lessonId } = useParams();
  return useQuery({
    queryKey: ["quizzes", lessonId],
    queryFn: () => lessonsApi.getQuizzes(lessonId),
    enabled: !!lessonId,
  });
}

export function useCompletedLesson() {
  const { lessonId } = useParams();
  return useQuery({
    queryKey: ["get-completed-lesson", lessonId],
    queryFn: () => lessonsApi.getCompletedLesson(lessonId),
    enabled: !!lessonId,
  });
}
