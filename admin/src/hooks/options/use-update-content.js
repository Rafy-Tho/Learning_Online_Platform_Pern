import { useMutation } from '@tanstack/react-query';
import optionApi from '../../services/OptionApi';

export function useUpdateOption() {
  const { mutateAsync: updateOption, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }) => optionApi.update(id, data),
  });
  return {
    updateOption,
    isUpdating,
  };
}
