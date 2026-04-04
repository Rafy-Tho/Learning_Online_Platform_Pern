import { useMutation, useQueryClient } from "@tanstack/react-query";
import courseApi from "../../services/CourseApi";

function useCreateReview() {
  const queryClient = useQueryClient(); // ✅ get instance

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["createReview"],
    mutationFn: (data) => courseApi.createReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["review-me"]);
    },
  });
  return { mutate, isPending, error };
}

export default useCreateReview;
