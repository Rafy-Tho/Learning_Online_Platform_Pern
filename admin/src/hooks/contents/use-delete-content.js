import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import contentApi from '../../services/ContentApi';

export function useDeleteContent() {
  const queryClient = useQueryClient();
  const param = useParams();
  const courseId = param.courseId;
  const { mutateAsync: deleteContent, isPending: isDeleting } = useMutation({
    mutationFn: (id) => contentApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course-details', courseId] });
    },
  });
  return {
    deleteContent,
    isDeleting,
  };
}
