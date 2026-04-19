import { useMutation } from '@tanstack/react-query';
import categoryApi from '../../services/CategoryApi';
export function useCreateCategory() {
  const {
    mutateAsync: createCategory,
    isPending,
    error,
  } = useMutation({
    mutationKey: ['create-category'],
    mutationFn: (category) => categoryApi.createCategory(category),
  });

  return { createCategory, isPending, error };
}
