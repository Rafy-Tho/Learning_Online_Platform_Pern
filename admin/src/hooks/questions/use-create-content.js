import { useMutation } from '@tanstack/react-query';
import lessonApi from '../../services/LessonApi';

export function useCreateQuestion() {
  const { mutateAsync: createQuestion, isPending: isCreating } = useMutation({
    mutationFn: ({ id, data }) => lessonApi.createQuestion(id, data),
  });
  return {
    createQuestion,
    isCreating,
  };
}
