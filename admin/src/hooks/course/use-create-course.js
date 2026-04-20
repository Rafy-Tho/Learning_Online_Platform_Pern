import { useMutation } from '@tanstack/react-query';
import courseApi from '../../services/CourseApi';

export const useCreateCourse = () => {
  const { mutateAsync: createCourse, isPending: isCreating } = useMutation({
    mutationFn: (data) => courseApi.createCourse(data),
  });
  return { createCourse, isCreating };
};
