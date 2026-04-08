import { useMutation } from "@tanstack/react-query";
import lessonApi from "../../services/LessonApi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function useCreateCompletedLesson() {
  const params = useParams();
  const lessonId = params.lessonId;
  const { mutate } = useMutation({
    mutationKey: ["create-completed-lesson", lessonId],
    mutationFn: () => lessonApi.completeLesson(lessonId),
    onError: (error) => {
      toast.error(error.message || "Failed to complete lesson");
    },
  });
  return { mutate };
}

export default useCreateCompletedLesson;
