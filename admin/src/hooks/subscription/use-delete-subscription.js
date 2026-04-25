import { useMutation, useQueryClient } from '@tanstack/react-query';
import subscriptionApi from '../../services/SubscriptionApi';

export const useDeleteSubscription = () => {
  const queryClient = useQueryClient();
  const { mutateAsync: deleteSubscription, isPending: isDeletingSubscription } =
    useMutation({
      mutationFn: (id) => subscriptionApi.delete(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      },
    });
  return { deleteSubscription, isDeletingSubscription };
};
