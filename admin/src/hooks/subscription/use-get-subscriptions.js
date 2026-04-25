import { useQuery } from '@tanstack/react-query';
import subscriptionApi from '../../services/SubscriptionApi';

export const useGetSubscriptions = () => {
  const { data: subscriptions, isLoading } = useQuery({
    queryKey: ['subscriptions'],
    queryFn: () => subscriptionApi.getSubscriptions(),
  });
  return { subscriptions, isLoading };
};
