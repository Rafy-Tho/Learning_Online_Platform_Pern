import { useQuery } from "@tanstack/react-query";
import courseApi from "../../services/CourseApi";
import { useParams } from "react-router-dom";
import useAuth from "../useAuth";

function useGetEnrollment() {
  const params = useParams();
  const courseId = params.courseId;
  const { user } = useAuth();
  const { data } = useQuery({
    queryKey: ["enrolled", courseId],
    queryFn: () => courseApi.getEnrollment(courseId),
    enabled: !!courseId && !!user,
  });
  return {
    data,
  };
}

export default useGetEnrollment;
