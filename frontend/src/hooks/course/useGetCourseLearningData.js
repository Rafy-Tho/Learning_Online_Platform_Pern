import { useQuery } from "@tanstack/react-query";
import courseApi from "../../services/CourseApi";
import { useParams } from "react-router-dom";

function useGetCourseLearningData() {
  const params = useParams();
  const courseId = params.courseId;
  const { data, isPending, error } = useQuery({
    queryKey: ["course-learning-data", courseId],
    queryFn: async () => courseApi.getCourseLearningData(courseId),
  });
  return { data, isPending, error };
}

export default useGetCourseLearningData;
