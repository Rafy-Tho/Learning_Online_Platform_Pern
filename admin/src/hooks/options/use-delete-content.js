import { useMutation } from '@tanstack/react-query';
import optionApi from '../../services/OptionApi';

export function useDeleteOption() {
  const { mutateAsync: deleteOption, isPending: isDeleting } = useMutation({
    mutationFn: (id) => optionApi.delete(id),
  });
  return {
    deleteOption,
    isDeleting,
  };
}
