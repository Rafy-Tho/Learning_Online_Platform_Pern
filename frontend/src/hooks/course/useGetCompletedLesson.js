import { useQuery } from "@tanstack/react-query";
import lessonApi from "../../services/LessonApi";
import { useParams } from "react-router-dom";

export function useGetCompletedLesson() {
  const params = useParams();
  const lessonId = params.lessonId;
  const { data } = useQuery({
    queryKey: ["get-completed-lessons", lessonId],
    queryFn: () => lessonApi.getCompletedLessons(lessonId),
  });
  return { data };
}
