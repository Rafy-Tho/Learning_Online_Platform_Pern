import { useMutation } from '@tanstack/react-query';
import questionApi from '../../services/QuestionApi';

export function useDeleteQuestion() {
  const { mutateAsync: deleteQuestion, isPending: isDeleting } = useMutation({
    mutationFn: (id) => questionApi.delete(id),
  });
  return {
    deleteQuestion,
    isDeleting,
  };
}
