import { useQuery } from "@tanstack/react-query";
import courseApi from "../../services/CourseApi";
import { useParams } from "react-router-dom";

function useGetCourseDetails() {
  const params = useParams();
  const courseId = params.courseId;
  const { data, isPending, error } = useQuery({
    queryKey: ["course-details", courseId],
    queryFn: async () => courseApi.getCourseDetails(courseId),
  });
  return { data, isPending, error };
}

export default useGetCourseDetails;
