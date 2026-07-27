import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import subscriptionApi from "../../services/SubscriptionApi";
import { useToast } from "../../components/ui/use-toast";

export function usePayments() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    user_subscription_id: "",
    amount: 0,
    payment_status: "COMPLETED",
    stripe_payment_intent_id: "",
  });

  const { data, isLoading } = useQuery({
    queryKey: ["admin-payments"],
    queryFn: () => subscriptionApi.getPayments(),
  });
  const payments = data?.data || [];

  const createMutation = useMutation({
    mutationFn: (data) => subscriptionApi.createPayment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-payments"] });
      toast({
        title: "Success!",
        description: "Payment created successfully.",
      });
    },
    onError: (err) => {
      toast({
        title: "Error!",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => subscriptionApi.updatePayment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-payments"] });
      toast({
        title: "Success!",
        description: "Payment updated successfully.",
      });
    },
    onError: (err) => {
      toast({
        title: "Error!",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => subscriptionApi.deletePayment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-payments"] });
      toast({
        title: "Success!",
        description: "Payment deleted successfully.",
      });
    },
    onError: (err) => {
      toast({
        title: "Error!",
        description: err.message,
        variant: "destructive",
      });
    },
  });

  const openCreate = () => {
    setEditing(null);
    setForm({
      user_subscription_id: "",
      amount: 0,
      payment_status: "COMPLETED",
      stripe_payment_intent_id: "",
    });
    setModalOpen(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({
      user_subscription_id: p.user_subscription_id,
      amount: p.amount,
      payment_status: p.payment_status,
      stripe_payment_intent_id: p.stripe_payment_intent_id || "",
    });
    setModalOpen(true);
  };

  const save = async () => {
    if (!form.user_subscription_id || form.amount <= 0) return;
    if (editing) {
      await updateMutation.mutateAsync({ id: editing.id, data: form });
    } else {
      await createMutation.mutateAsync({
        user_subscription_id: form.user_subscription_id,
        amount: form.amount,
        payment_status: form.payment_status,
        stripe_payment_intent_id: form.stripe_payment_intent_id || undefined,
      });
    }
    setModalOpen(false);
  };

  const remove = async (id) => {
    await deleteMutation.mutateAsync(id);
  };

  return {
    payments,
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
