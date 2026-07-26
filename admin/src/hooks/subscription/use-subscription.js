import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import subscriptionApi from '../../services/SubscriptionApi';
import { useToast } from '../../components/ui/use-toast';

export function useSubscriptions() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    user_id: '',
    plan_id: '',
    start_date: '',
    end_date: '',
    status: 'ACTIVE',
  });

  const { data, isLoading } = useQuery({
    queryKey: ['admin-user-subscriptions'],
    queryFn: () => subscriptionApi.getUserSubscriptions(),
  });
  const subscriptions = data?.data || [];

  const createMutation = useMutation({
    mutationFn: (data) => subscriptionApi.createUserSubscription(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-user-subscriptions'] });
      toast({ title: 'Success!', description: 'Subscription created successfully.' });
    },
    onError: (err) => {
      toast({ title: 'Error!', description: err.message, variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => subscriptionApi.updateUserSubscription(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-user-subscriptions'] });
      toast({ title: 'Success!', description: 'Subscription updated successfully.' });
    },
    onError: (err) => {
      toast({ title: 'Error!', description: err.message, variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => subscriptionApi.deleteUserSubscription(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-user-subscriptions'] });
      toast({ title: 'Success!', description: 'Subscription deleted successfully.' });
    },
    onError: (err) => {
      toast({ title: 'Error!', description: err.message, variant: 'destructive' });
    },
  });

  const openCreate = () => {
    setEditing(null);
    setForm({
      user_id: '',
      plan_id: '',
      start_date: '',
      end_date: '',
      status: 'ACTIVE',
    });
    setModalOpen(true);
  };

  const openEdit = (s) => {
    setEditing(s);
    setForm({
      user_id: s.user_id,
      plan_id: s.plan_id,
      start_date: s.start_date?.slice(0, 10) || '',
      end_date: s.end_date?.slice(0, 10) || '',
      status: s.status,
    });
    setModalOpen(true);
  };

  const save = async () => {
    if (!form.user_id || !form.plan_id) return;
    if (editing) {
      await updateMutation.mutateAsync({ id: editing.id, data: form });
    } else {
      await createMutation.mutateAsync(form);
    }
    setModalOpen(false);
  };

  const remove = async (id) => {
    await deleteMutation.mutateAsync(id);
  };

  return {
    subscriptions,
    isLoading,
    modalOpen,
    setModalOpen,
    editing,
    form,
    setForm,
    openCreate,
    openEdit,
    save,
    remove,
  };
}
