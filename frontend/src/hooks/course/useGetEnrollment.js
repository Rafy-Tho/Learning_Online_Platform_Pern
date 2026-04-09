import { useQuery } from "@tanstack/react-query";
import courseApi from "../../services/CourseApi";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import useAuth from "../useAuth";

function useGetEnrollment() {
  const params = useParams();
  const courseId = params.courseId;
  const { user } = useAuth();
  const { data } = useQuery({
    queryKey: ["enrolled", courseId],
    queryFn: () => courseApi.getEnrollment(courseId),
    onError: (error) => {
      toast.error(error.message || "Failed to get enrollment");
    },
    enabled: !!courseId && !!user,
  });
  return {
    data,
  };
}

export default useGetEnrollment;
