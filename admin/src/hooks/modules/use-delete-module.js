import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import moduleApi from '../../services/ModuleApi';

export function useDeleteModule() {
  const queryClient = useQueryClient();
  const param = useParams();
  const courseId = param.courseId;
  const { mutateAsync: deleteModule, isPending: isDeleting } = useMutation({
    mutationFn: (id) => moduleApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course-details', courseId] });
    },
  });
  return {
    deleteModule,
    isDeleting,
  };
}
