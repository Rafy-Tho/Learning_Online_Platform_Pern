import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import lessonApi from "../../services/LessonApi";

function useGetLessonContent() {
  const { lessonId } = useParams();
  const { data, isPending, error } = useQuery({
    queryKey: ["lesson-content", lessonId],
    queryFn: async () => lessonApi.getLessonContent(lessonId),
  });
  return { data, isPending, error };
}

export default useGetLessonContent;
