import { useMutation, useQueryClient } from '@tanstack/react-query';
import categoryApi from '../../services/CategoryApi';

export default function useDeleteCategory() {
  const queryClient = useQueryClient();
  const {
    mutateAsync: deleteCategory,
    isPending,
    error,
  } = useMutation({
    mutationKey: ['delete-category'],
    mutationFn: (id) => categoryApi.deleteCategory(id),
    onSuccess: () => {
      // Invalidate and refetch categories query
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  return { deleteCategory, isPending, error };
}
