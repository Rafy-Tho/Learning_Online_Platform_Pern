import { useQuery } from '@tanstack/react-query';
import userApi from '../../services/UserApi';

function useGetMe() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['me'],
    queryFn: async () => userApi.getMe(),
    retry: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchOnWindowFocus: false,
  });
  return { data, isLoading, error };
}

export default useGetMe;
