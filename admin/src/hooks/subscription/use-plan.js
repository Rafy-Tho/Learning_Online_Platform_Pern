import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import subscriptionApi from '../../services/SubscriptionApi';
import { useToast } from '../../components/ui/use-toast';

export function usePlans() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', duration_days: 30, price: 0 });

  const { data, isLoading } = useQuery({
    queryKey: ['admin-plans'],
    queryFn: () => subscriptionApi.getPlans(),
  });
  const plans = data?.data || [];

  const createMutation = useMutation({
    mutationFn: (data) => subscriptionApi.createPlan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-plans'] });
      toast({ title: 'Success!', description: 'Plan created successfully.' });
    },
    onError: (err) => {
      toast({ title: 'Error!', description: err.message, variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => subscriptionApi.updatePlan(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-plans'] });
      toast({ title: 'Success!', description: 'Plan updated successfully.' });
    },
    onError: (err) => {
      toast({ title: 'Error!', description: err.message, variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => subscriptionApi.deletePlan(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-plans'] });
      toast({ title: 'Success!', description: 'Plan deleted successfully.' });
    },
    onError: (err) => {
      toast({ title: 'Error!', description: err.message, variant: 'destructive' });
    },
  });

  const openCreate = () => {
    setEditing(null);
    setForm({ name: '', duration_days: 30, price: 0 });
    setModalOpen(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({ name: p.name, duration_days: p.duration_days, price: p.price });
    setModalOpen(true);
  };

  const save = async () => {
    if (!form.name || form.price <= 0) return;
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
    plans,
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
