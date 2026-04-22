import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import lessonApi from '../../services/LessonApi';

export function useUpdateLesson() {
  const queryClient = useQueryClient();
  const param = useParams();
  const courseId = param.courseId;
  const { mutateAsync: updateLesson, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, data }) => lessonApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course-details', courseId] });
    },
  });
  return {
    updateLesson,
    isUpdating,
  };
}
