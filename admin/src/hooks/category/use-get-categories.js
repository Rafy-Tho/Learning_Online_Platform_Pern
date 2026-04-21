import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext';
import categoryApi from '../../services/CategoryApi';

function useGetCategories() {
  const { user } = useAuth();
  const { data, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.getCategories(),
    enabled: !!user,
  });

  return { data, isLoading, error };
}
export default useGetCategories;
