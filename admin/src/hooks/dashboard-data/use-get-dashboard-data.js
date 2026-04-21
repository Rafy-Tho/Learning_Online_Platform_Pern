import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../contexts/AuthContext';
import userApi from '../../services/UserApi';

export default function useGetDashboardData() {
  const { user } = useAuth();
  const { data, isPending, error } = useQuery({
    queryKey: ['dashboard-data'],
    queryFn: () => userApi.getDashboardData(),
    enabled: !!user,
  });
  return { data, isPending, error };
}
