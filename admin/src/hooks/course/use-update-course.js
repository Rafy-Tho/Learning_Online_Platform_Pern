import { useMutation } from '@tanstack/react-query';
import courseApi from '../../services/CourseApi';

export const useUpdateCourse = () => {
  const { mutateAsync: updateCourse, isPending } = useMutation({
    mutationKey: ['update-course'],
    mutationFn: ({ id, data }) => courseApi.updateCourse(id, data),
  });
  return { updateCourse, isPending };
};
