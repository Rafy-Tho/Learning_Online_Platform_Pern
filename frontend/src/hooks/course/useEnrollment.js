import { useMutation } from "@tanstack/react-query";
import courseApi from "../../services/CourseApi";

function useEnrollment() {
  const { mutate, isPending } = useMutation({
    mutationKey: ["enroll"],
    mutationFn: (data) => courseApi.enroll(data),
  });
  return {
    mutate,
    isPending,
  };
}
export default useEnrollment;
