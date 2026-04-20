import { useMutation } from '@tanstack/react-query';
import courseApi from '../../services/CourseApi';

export const useDeleteCourse = () => {
  const { mutateAsync: deleteCourse, isPending: isDeleting } = useMutation({
    mutationKey: ['delete-course'],
    mutationFn: (id) => courseApi.deleteCourse(id),
  });
  return { deleteCourse, isDeleting };
};
