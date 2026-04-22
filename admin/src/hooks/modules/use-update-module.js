import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import moduleApi from '../../services/ModuleApi';

export const useUpdateModule = () => {
  const queryClient = useQueryClient();
  const param = useParams();
  const courseId = param.courseId;
  const { mutateAsync: updateModule, isPending: isUpdating } = useMutation({
    mutationKey: ['update-module'],
    mutationFn: ({ id, data }) => moduleApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course-details', courseId] });
    },
  });
  return { updateModule, isUpdating };
};
