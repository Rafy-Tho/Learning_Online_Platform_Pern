import { useMutation, useQueryClient } from '@tanstack/react-query';
import subscriptionApi from '../../services/SubscriptionApi';

export const useCreateSubscription = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: createSubscription, isPending: isCreatingSubscription } =
    useMutation({
      mutationFn: (data) => subscriptionApi.createSubscription(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      },
    });
  return { createSubscription, isCreatingSubscription };
};
