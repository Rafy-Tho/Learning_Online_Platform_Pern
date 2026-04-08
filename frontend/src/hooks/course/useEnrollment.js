import { useMutation } from "@tanstack/react-query";
import courseApi from "../../services/CourseApi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function useEnrollment() {
  const params = useParams();
  const courseId = params.courseId;
  const { mutate } = useMutation({
    mutationKey: ["enroll-course", courseId],
    mutationFn: () => courseApi.enrollCourse(courseId),
    onError: (error) => {
      toast.error(error.message || "Enrollment failed");
    },
  });
  return {
    mutate,
  };
}
export default useEnrollment;
