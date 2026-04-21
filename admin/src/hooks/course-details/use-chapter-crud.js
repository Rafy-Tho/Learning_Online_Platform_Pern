import { useState } from 'react';

const DEFAULT_FORM = { name: '', description: '', status: 'DRAFT' };

export function useChapterCrud({ chapters, setChapters }) {
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [parentId, setParentId] = useState('');
  const [form, setForm] = useState(DEFAULT_FORM);

  const openCreate = (moduleId) => {
    setParentId(moduleId);
    setEditing(null);
    setForm(DEFAULT_FORM);
    setModal(true);
  };

  const openEdit = (ch) => {
    setParentId(ch.module_id);
    setEditing(ch);
    setForm({
      name: ch.name,
      description: ch.description || '',
      status: ch.status,
    });
    setModal(true);
  };

  const save = () => {
    if (!form.name) return;
    if (editing) {
      setChapters((cs) =>
        cs.map((c) => (c.id === editing.id ? { ...c, ...form } : c)),
      );
    } else {
      const count = chapters.filter((c) => c.module_id === parentId).length;
      setChapters((cs) => [
        ...cs,
        {
          id: crypto.randomUUID(),
          module_id: parentId,
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
