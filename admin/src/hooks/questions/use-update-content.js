import { useMutation } from '@tanstack/react-query';
import questionApi from '../../services/QuestionApi';

export function useUpdateQuestion() {
  const { mutateAsync: updateQuestion, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }) => questionApi.update(id, data),
  });
  return {
    updateQuestion,
    isUpdating,
  };
}
