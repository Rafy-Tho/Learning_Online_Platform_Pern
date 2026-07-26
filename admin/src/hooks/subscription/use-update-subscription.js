import { useMutation, useQueryClient } from '@tanstack/react-query';
import subscriptionApi from '../../services/SubscriptionApi';

export const useUpdateSubscription = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: updateSubscription, isPending: isUpdatingSubscription } =
    useMutation({
      mutationFn: (data) => subscriptionApi.updateSubscription(data.id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      },
    });
  return { updateSubscription, isUpdatingSubscription };
};
