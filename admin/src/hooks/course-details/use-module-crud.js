import { useState } from 'react';
import { useCreateModule } from '../modules/use-create-module';
import { useDeleteModule } from '../modules/use-delete-module';
import { useUpdateModule } from '../modules/use-update-module';
import { toast } from '../use-toast';

const DEFAULT_FORM = {
  name: '',
  description: '',
  status: 'DRAFT',
  position: '',
};

export function useModuleCrud({
  setModules,
  setChapters,
  setLessons,
  setQuizzes,
  setLessonContents,
  setQuizOptions,
  chapters,
  lessons,
  quizzes,
}) {
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(DEFAULT_FORM);
  const { createModule, isCreating } = useCreateModule();
  const { updateModule, isUpdating } = useUpdateModule();
  const { deleteModule } = useDeleteModule();

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
      position: m.position,
    });
    setModal(true);
  };

  const save = async () => {
    if (!form.name) return;
    if (editing) {
      try {
        const response = await updateModule({
          id: editing.id,
          data: { ...form },
        });
        setModules((ms) =>
          ms.map((m) =>
            m.id === editing.id ? { ...m, ...response?.data } : m,
          ),
        );
        toast({
          title: 'Success',
          description: 'Module updated successfully',
        });
      } catch (err) {
        toast({
          title: 'Error',
          description: err?.message || 'Failed to update module',
          variant: 'destructive',
        });
      } finally {
        setModal(false);
      }
    } else {
      try {
        const response = await createModule(form);
        setModules((ms) => [...ms, response?.data]);
        toast({
          title: 'Success',
          description: 'Module created successfully',
        });
      } catch (err) {
        toast({
          title: 'Error',
          description: err?.message || 'Failed to create module',
          variant: 'destructive',
        });
      } finally {
        setModal(false);
      }
    }
  };

  const onChange = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  const remove = async (id) => {
    try {
      await deleteModule(id);
      toast({ title: 'Success', description: 'Module deleted' });
      const chapterIds = chapters
        .filter((c) => c.module_id === id)
        .map((c) => c.id);
      const lessonIds = lessons
        .filter((l) => chapterIds.includes(l.chapter_id))
        .map((l) => l.id);
      const quizIds = quizzes
        .filter((q) => lessonIds.includes(q.lesson_id))
        .map((q) => q.id);
      setQuizOptions((os) => os.filter((o) => !quizIds.includes(o.quiz_id)));
      setQuizzes((qs) => qs.filter((q) => !lessonIds.includes(q.lesson_id)));
      setLessonContents((cs) =>
        cs.filter((c) => !lessonIds.includes(c.lesson_id)),
      );
      setLessons((ls) => ls.filter((l) => !chapterIds.includes(l.chapter_id)));
      setChapters((cs) => cs.filter((c) => c.module_id !== id));
      setModules((ms) => ms.filter((m) => m.id !== id));
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to delete module',
        variant: 'destructive',
      });
    }
  };
  return {
    modal,
    setModal,
    editing,
    form,
    onChange,
    openCreate,
    openEdit,
    save,
    remove,
    isCreating,
    isUpdating,
  };
}
