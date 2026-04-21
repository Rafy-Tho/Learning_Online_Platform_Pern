import { useMutation, useQueryClient } from '@tanstack/react-query';
import categoryApi from '../../services/CategoryApi';
export function useCreateCategory() {
  const queryClient = useQueryClient();
  const {
    mutateAsync: createCategory,
    isPending,
    error,
  } = useMutation({
    mutationKey: ['create-category'],
    mutationFn: (category) => categoryApi.createCategory(category),
    onSuccess: () => {
      // Invalidate and refetch categories query
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  return { createCategory, isPending, error };
}
