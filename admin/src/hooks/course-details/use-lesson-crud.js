import { useState } from 'react';

const DEFAULT_FORM = {
  name: '',
  description: '',
  type: 'TEXT',
  status: 'DRAFT',
  xp_points: 10,
  duration_minutes: 15,
};

export function useLessonCrud({ lessons, setLessons }) {
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [parentId, setParentId] = useState('');
  const [form, setForm] = useState(DEFAULT_FORM);

  const openCreate = (chapterId) => {
    setParentId(chapterId);
    setEditing(null);
    setForm(DEFAULT_FORM);
    setModal(true);
  };

  const openEdit = (l) => {
    setParentId(l.chapter_id);
    setEditing(l);
    setForm({
      name: l.name,
      description: l.description || '',
      type: l.type,
      status: l.status,
      xp_points: l.xp_points,
      duration_minutes: l.duration_minutes,
    });
    setModal(true);
  };

  const save = () => {
    if (!form.name) return;
    if (editing) {
      setLessons((ls) =>
        ls.map((l) => (l.id === editing.id ? { ...l, ...form } : l)),
      );
    } else {
      const count = lessons.filter((l) => l.chapter_id === parentId).length;
      setLessons((ls) => [
        ...ls,
        {
          id: crypto.randomUUID(),
          chapter_id: parentId,
          position: count + 1,
          ...form,
        },
      ]);
    }
    setModal(false);
  };

  const onChange = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  return {
    modal,
    setModal,
    editing,
    form,
    onChange,
    openCreate,
    openEdit,
    save,
  };
}
