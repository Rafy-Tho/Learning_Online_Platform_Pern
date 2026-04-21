import { useQuery } from '@tanstack/react-query';
import courseApi from '../../services/CourseApi';
import parseQueryToObject from '../../utils/parseQueryToObject';
import parseQueryToString from '../../utils/parseQueryToString';

export const useGetCourses = (params) => {
  const queryString = parseQueryToString(params);
  const queryObj = parseQueryToObject(params);
  const { data, isLoading, error } = useQuery({
    queryKey: ['courses', queryObj],
    queryFn: () => courseApi.getAllCourses(queryString),
  });
  return { data, isLoading, error };
};
