import { useQuery } from '@tanstack/react-query';
import courseApi from '../../services/CourseApi';

export function useGetCourseDetails(id) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['course-details', id],
    queryFn: () => courseApi.getCourseDetails(id),
    enabled: !!id,
  });
  return { data, isLoading, error };
}
