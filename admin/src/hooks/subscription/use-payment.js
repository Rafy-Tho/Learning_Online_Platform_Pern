import { useState } from 'react';
import { mockSubscriptionPayments } from '../../data/mockData';

export function usePayments() {
  const [payments, setPayments] = useState(mockSubscriptionPayments);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    user_subscription_id: '',
    amount: 0,
    payment_status: 'PENDING',
  });

  const openCreate = () => {
    setEditing(null);
    setForm({ user_subscription_id: '', amount: 0, payment_status: 'PENDING' });
    setModalOpen(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({
      user_subscription_id: p.user_subscription_id,
      amount: p.amount,
      payment_status: p.payment_status,
    });
    setModalOpen(true);
  };

  const save = (subscriptions) => {
    if (!form.user_subscription_id || form.amount <= 0) return;
    const sub = subscriptions.find((s) => s.id === form.user_subscription_id);
    if (editing) {
      setPayments((ps) =>
        ps.map((p) =>
          p.id === editing.id
            ? {
                ...p,
                ...form,
                user_name: sub?.user_name,
                plan_name: sub?.plan_name,
              }
            : p,
        ),
      );
    } else {
      setPayments((ps) => [
        ...ps,
        {
          id: crypto.randomUUID(),
          ...form,
          user_name: sub?.user_name,
          plan_name: sub?.plan_name,
          created_at: new Date().toISOString(),
        },
      ]);
    }
    setModalOpen(false);
  };

  const remove = (id) => setPayments((ps) => ps.filter((p) => p.id !== id));

  return {
    payments,
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
