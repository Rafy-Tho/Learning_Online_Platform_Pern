import { useState } from 'react';

const DEFAULT_FORM = { name: '', content: '' };

export function useContentCrud({ lessonContents, setLessonContents }) {
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [parentId, setParentId] = useState('');
  const [form, setForm] = useState(DEFAULT_FORM);

  const openCreate = (lessonId) => {
    setParentId(lessonId);
    setEditing(null);
    setForm(DEFAULT_FORM);
    setModal(true);
  };

  const openEdit = (lc) => {
    setParentId(lc.lesson_id);
    setEditing(lc);
    setForm({ name: lc.name, content: lc.content });
    setModal(true);
  };

  const save = () => {
    if (!form.name || !form.content) return;
    if (editing) {
      setLessonContents((cs) =>
        cs.map((c) => (c.id === editing.id ? { ...c, ...form } : c)),
      );
    } else {
      const count = lessonContents.filter(
        (c) => c.lesson_id === parentId,
      ).length;
      setLessonContents((cs) => [
        ...cs,
        {
          id: crypto.randomUUID(),
          lesson_id: parentId,
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
