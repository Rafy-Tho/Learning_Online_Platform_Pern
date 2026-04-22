import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import lessonApi from '../../services/LessonApi';

export function useCreateContent() {
  const queryClient = useQueryClient();
  const param = useParams();
  const courseId = param.courseId;
  const { mutateAsync: createContent, isPending: isCreating } = useMutation({
    mutationFn: ({ id, data }) => lessonApi.createContent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course-details', courseId] });
    },
  });
  return {
    createContent,
    isCreating,
  };
}
