import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import chapterApi from '../../services/ChapterApi';

export function useCreateLesson() {
  const queryClient = useQueryClient();
  const param = useParams();
  const courseId = param.courseId;
  const { mutateAsync: createLesson, isPending: isCreating } = useMutation({
    mutationFn: ({ id, data }) => chapterApi.createLesson(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course-details', courseId] });
    },
  });
  return {
    createLesson,
    isCreating,
  };
}
