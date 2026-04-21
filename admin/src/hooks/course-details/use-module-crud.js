import { useState } from 'react';

const DEFAULT_FORM = { name: '', description: '', status: 'DRAFT' };

export function useModuleCrud({ courseId, setModules }) {
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(DEFAULT_FORM);

  const openCreate = () => {
    setEditing(null);
    setForm(DEFAULT_FORM);
    setModal(true);
  };

  const openEdit = (m) => {
    setEditing(m);
    setForm({
      name: m.name,
      description: m.description || '',
      status: m.status,
    });
    setModal(true);
  };

  const save = () => {
    if (!form.name) return;
    if (editing) {
      setModules((ms) =>
        ms.map((m) => (m.id === editing.id ? { ...m, ...form } : m)),
      );
    } else {
      setModules((ms) => [
        ...ms,
        {
          id: crypto.randomUUID(),
          course_id: courseId,
          position: ms.length + 1,
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
