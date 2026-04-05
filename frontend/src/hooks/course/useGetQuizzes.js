import { useQuery } from "@tanstack/react-query";
import lessonApi from "../../services/LessonApi";
import { useParams } from "react-router-dom";

function useGetQuizzes() {
  const { lessonId } = useParams();
  const { data, isPending, error } = useQuery({
    queryKey: ["quizzes", lessonId],
    queryFn: () => lessonApi.getQuizzes(lessonId),
  });
  return { data, isPending, error };
}

export default useGetQuizzes;
