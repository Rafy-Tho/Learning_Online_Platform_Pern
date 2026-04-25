import { useQuery } from '@tanstack/react-query';
import subscriptionApi from '../../services/SubscriptionApi';

export const useGetSubscriptionData = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['subscription-data'],
    queryFn: () => subscriptionApi.getData(),
  });
  return { data, isLoading, error };
};
