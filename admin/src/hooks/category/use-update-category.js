import { useMutation, useQueryClient } from '@tanstack/react-query';
import categoryApi from '../../services/CategoryApi';
export function useUpdateCategory() {
  const queryClient = useQueryClient();
  const {
    mutateAsync: updateCategory,
    isPending,
    error,
  } = useMutation({
    mutationKey: ['update-category'],
    mutationFn: ({ id, category }) => categoryApi.updateCategory(id, category),
    onSuccess: () => {
      // Invalidate and refetch categories query
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  return { updateCategory, isPending, error };
}
