import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import objectiveApi from '../../services/ObjectiveApi';

export const useUpdateObjective = () => {
  const queryClient = useQueryClient();
  const param = useParams();
  const courseId = param.courseId;
  const { mutateAsync: updateObjective, isPending: isUpdating } = useMutation({
    mutationKey: ['update-objective'],
    mutationFn: ({ objectiveId, objectiveData }) =>
      objectiveApi.update(objectiveId, objectiveData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course-details', courseId] });
    },
  });
  return { updateObjective, isUpdating };
};
