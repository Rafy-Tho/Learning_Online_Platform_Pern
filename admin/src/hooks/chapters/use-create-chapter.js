import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import moduleApi from '../../services/ModuleApi';

export function useCreateChapter() {
  const queryClient = useQueryClient();
  const param = useParams();
  const courseId = param.courseId;
  const { mutateAsync: createChapter, isPending: isCreating } = useMutation({
    mutationFn: ({ id, data }) => moduleApi.createChapter(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course-details', courseId] });
    },
  });
  return {
    createChapter,
    isCreating,
  };
}
