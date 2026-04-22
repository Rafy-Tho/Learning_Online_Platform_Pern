import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import contentApi from '../../services/ContentApi';

export function useUpdateContent() {
  const queryClient = useQueryClient();
  const param = useParams();
  const courseId = param.courseId;
  const { mutateAsync: updateContent, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }) => contentApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course-details', courseId] });
    },
  });
  return {
    updateContent,
    isUpdating,
  };
}
