import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import courseApi from '../../services/CourseApi';

export function useCreateModule() {
  const queryClient = useQueryClient();
  const param = useParams();
  const courseId = param.courseId;
  const { mutateAsync: createModule, isPending: isCreating } = useMutation({
    mutationFn: (data) => courseApi.createModule(courseId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course-details', courseId] });
    },
  });
  return {
    createModule,
    isCreating,
  };
}
