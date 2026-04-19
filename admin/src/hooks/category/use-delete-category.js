import { useMutation } from '@tanstack/react-query';
import categoryApi from '../../services/CategoryApi';

export default function useDeleteCategory() {
  const {
    mutateAsync: deleteCategory,
    isPending,
    error,
  } = useMutation({
    mutationKey: ['delete-category'],
    mutationFn: (id) => categoryApi.deleteCategory(id),
  });

  return { deleteCategory, isPending, error };
}
