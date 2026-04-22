import { useMutation } from '@tanstack/react-query';
import questionApi from '../../services/QuestionApi';

export function useCreateOption() {
  const { mutateAsync: createOption, isPending: isCreating } = useMutation({
    mutationFn: ({ id, data }) => questionApi.createOption(id, data),
  });
  return {
    createOption,
    isCreating,
  };
}
