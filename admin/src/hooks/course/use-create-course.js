import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import courseApi from '../../services/CourseApi';
import parseQueryToObject from '../../utils/parseQueryToObject';

export const useCreateCourse = () => {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const queryObj = parseQueryToObject(searchParams);
  const { mutateAsync: createCourse, isPending: isCreating } = useMutation({
    mutationFn: (data) => courseApi.createCourse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses', queryObj] });
    },
  });
  return { createCourse, isCreating };
};
