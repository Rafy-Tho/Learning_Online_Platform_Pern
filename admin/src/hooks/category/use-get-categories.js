import { useQuery } from '@tanstack/react-query';
import categoryApi from '../../services/CategoryApi';

function useGetCategories() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.getCategories(),
  });

  return { data, isLoading, error };
}
export default useGetCategories;
