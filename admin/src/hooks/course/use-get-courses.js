import { useQuery } from '@tanstack/react-query';

import { useAuth } from '../../contexts/AuthContext';
import courseApi from '../../services/CourseApi';
import parseQueryToObject from '../../utils/parseQueryToObject';
import parseQueryToString from '../../utils/parseQueryToString';

export const useGetCourses = (params) => {
  const { user } = useAuth();
  const queryString = parseQueryToString(params);
  const queryObj = parseQueryToObject(params);
  const { data, isLoading, error } = useQuery({
    queryKey: ['courses', queryObj],
    queryFn: () => courseApi.getAllCourses(queryString),
    enabled: !!user,
  });
  return { data, isLoading, error };
};
