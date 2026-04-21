import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import courseApi from '../../services/CourseApi';

export function useGetCourseDetails() {
  const param = useParams();
  const courseId = param.courseId;
  const { data, isLoading, error } = useQuery({
    queryKey: ['course-details', courseId],
    queryFn: () => courseApi.getCourseDetails(courseId),
    enabled: !!courseId,
  });
  return { data, isLoading, error };
}
