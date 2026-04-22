import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import chapterApi from '../../services/ChapterApi';

export function useDeleteChapter() {
  const queryClient = useQueryClient();
  const param = useParams();
  const courseId = param.courseId;
  const { mutateAsync: deleteChapter, isPending: isDeleting } = useMutation({
    mutationFn: (id) => chapterApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course-details', courseId] });
    },
  });
  return {
    deleteChapter,
    isDeleting,
  };
}
