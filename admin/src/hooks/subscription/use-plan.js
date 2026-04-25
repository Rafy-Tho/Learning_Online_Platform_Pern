import { useState } from 'react';
import { mockSubscriptionPlans } from '../../data/mockData';

export function usePlans() {
  const [plans, setPlans] = useState(mockSubscriptionPlans);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', duration_days: 30, price: 0 });

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

  const save = () => {
    if (!form.name || form.price <= 0) return;
    if (editing) {
      setPlans((ps) =>
        ps.map((p) => (p.id === editing.id ? { ...p, ...form } : p)),
      );
    } else {
      setPlans((ps) => [
        ...ps,
        {
          id: crypto.randomUUID(),
          ...form,
          created_at: new Date().toISOString(),
        },
      ]);
    }
    setModalOpen(false);
  };

  const remove = (id) => setPlans((ps) => ps.filter((p) => p.id !== id));

  return {
    plans,
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
