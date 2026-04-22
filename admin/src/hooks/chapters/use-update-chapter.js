import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import chapterApi from '../../services/ChapterApi';

export const useUpdateChapter = () => {
  const queryClient = useQueryClient();
  const param = useParams();
  const courseId = param.courseId;
  const { mutateAsync: updateChapter, isPending: isUpdating } = useMutation({
    mutationKey: ['update-chapter'],
    mutationFn: ({ id, data }) => chapterApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course-details', courseId] });
    },
  });
  return { updateChapter, isUpdating };
};
