import { useMutation } from '@tanstack/react-query';
import categoryApi from '../../services/CategoryApi';
export function useUpdateCategory() {
  const {
    mutateAsync: updateCategory,
    isPending,
    error,
  } = useMutation({
    mutationKey: ['update-category'],
    mutationFn: ({ id, category }) => categoryApi.updateCategory(id, category),
  });

  return { updateCategory, isPending, error };
}
