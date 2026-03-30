import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import courseApi from "../../services/CourseApi";

function useGetFirstLesson() {
  const params = useParams();
  const courseId = params.courseId;
  const { data, isPending, error } = useQuery({
    queryKey: ["first-lesson", courseId],
    queryFn: async () => courseApi.getFirstLesson(courseId),
  });

  return { data, isPending, error };
}

export default useGetFirstLesson;
