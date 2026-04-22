import { useState } from 'react';
import { useCreateChapter } from '../chapters/use-create-chapter';
import { useDeleteChapter } from '../chapters/use-delete-chapter';
import { useUpdateChapter } from '../chapters/use-update-chapter';
import { toast } from '../use-toast';

const DEFAULT_FORM = {
  name: '',
  description: '',
  status: 'DRAFT',
  position: '',
};

export function useChapterCrud({
  setChapters,
  lessons,
  quizzes,
  setQuizOptions,
  setQuizzes,
  setLessonContents,
  setLessons,
}) {
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [parentId, setParentId] = useState('');
  const [form, setForm] = useState(DEFAULT_FORM);
  const { createChapter, isCreating } = useCreateChapter();
  const { updateChapter, isUpdating } = useUpdateChapter();
  const { deleteChapter } = useDeleteChapter();
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
      position: ch.position,
    });
    setModal(true);
  };

  const save = async () => {
    if (!form.name) return;
    if (editing) {
      try {
        await updateChapter({
          id: editing.id,
          data: {
            name: form.name,
            description: form.description,
            status: form.status,
            position: form.position,
          },
        });
        setChapters((cs) =>
          cs.map((c) => (c.id === editing.id ? { ...c, ...form } : c)),
        );
        toast({
          title: 'Chapter updated',
          description: 'Chapter has been updated successfully',
        });
      } catch (error) {
        toast({
          title: 'Chapter update failed',
          description: error?.message || 'Chapter could not be updated',
          variant: 'destructive',
        });
      } finally {
        setModal(false);
      }
    } else {
      try {
        const response = await createChapter({
          id: parentId,
          data: {
            name: form.name,
            description: form.description,
            status: form.status,
            position: form.position,
          },
        });
        setChapters((cs) => [...cs, response?.data]);
        toast({
          title: 'Chapter created',
          description: 'Chapter has been created successfully',
        });
      } catch (error) {
        toast({
          title: 'Chapter creation failed',
          description: error?.message || 'Chapter could not be created',
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
      await deleteChapter(id);
      const lessonIds = lessons
        .filter((l) => l.chapter_id === id)
        .map((l) => l.id);
      const quizIds = quizzes
        .filter((q) => lessonIds.includes(q.lesson_id))
        .map((q) => q.id);
      setQuizOptions((os) => os.filter((o) => !quizIds.includes(o.quiz_id)));
      setQuizzes((qs) => qs.filter((q) => !lessonIds.includes(q.lesson_id)));
      setLessonContents((cs) =>
        cs.filter((c) => !lessonIds.includes(c.lesson_id)),
      );
      setLessons((ls) => ls.filter((l) => l.chapter_id !== id));
      setChapters((cs) => cs.filter((c) => c.id !== id));
      toast({
        title: 'Chapter deleted',
        description: 'Chapter has been deleted successfully',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to delete chapter',
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
