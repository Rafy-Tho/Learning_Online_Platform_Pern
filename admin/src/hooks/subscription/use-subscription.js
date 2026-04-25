import { useState } from 'react';
import { mockUserSubscriptions } from '../../data/mockData';

export function useSubscriptions() {
  const [subscriptions, setSubscriptions] = useState(mockUserSubscriptions);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    user_id: '',
    plan_id: '',
    start_date: '',
    end_date: '',
    status: 'ACTIVE',
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
      start_date: s.start_date.slice(0, 10),
      end_date: s.end_date.slice(0, 10),
      status: s.status,
    });
    setModalOpen(true);
  };

  const save = (learners, plans) => {
    if (!form.user_id || !form.plan_id) return;
    const user = learners.find((u) => u.id === form.user_id);
    const plan = plans.find((p) => p.id === form.plan_id);
    if (editing) {
      setSubscriptions((ss) =>
        ss.map((s) =>
          s.id === editing.id
            ? { ...s, ...form, user_name: user?.name, plan_name: plan?.name }
            : s,
        ),
      );
    } else {
      setSubscriptions((ss) => [
        ...ss,
        {
          id: crypto.randomUUID(),
          ...form,
          user_name: user?.name,
          plan_name: plan?.name,
          created_at: new Date().toISOString(),
        },
      ]);
    }
    setModalOpen(false);
  };

  const remove = (id) =>
    setSubscriptions((ss) => ss.filter((s) => s.id !== id));

  return {
    subscriptions,
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
