import { useState } from 'react';

import { useCreateLesson } from '../lessons/use-create-lesson';
import { useDeleteLesson } from '../lessons/use-delete-lesson';
import { useUpdateLesson } from '../lessons/use-update-lesson';
import { toast } from '../use-toast';

const DEFAULT_FORM = {
  name: '',
  description: '',
  type: 'TEXT',
  status: 'DRAFT',
  xp_points: 10,
  duration_minutes: 15,
  position: '',
  access_type: 'FREE',
};

export function useLessonCrud({
  setLessons,
  quizzes,
  setQuizzes,
  setLessonContents,
  setQuizOptions,
}) {
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [parentId, setParentId] = useState('');
  const [form, setForm] = useState(DEFAULT_FORM);
  const { createLesson, isCreating } = useCreateLesson();
  const { deleteLesson } = useDeleteLesson();
  const { updateLesson, isUpdating } = useUpdateLesson();
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
      position: l.position,
      access_type: l.access_type,
    });
    setModal(true);
  };

  const save = async () => {
    if (!form.name) return;
    if (editing) {
      try {
        await updateLesson({
          id: editing.id,
          data: {
            name: form.name,
            description: form.description,
            type: form.type,
            status: form.status,
            xpPoints: form.xp_points,
            durationMinutes: form.duration_minutes,
            position: form.position,
            accessType: form.access_type,
          },
        });
        setLessons((ls) =>
          ls.map((l) => (l.id === editing.id ? { ...l, ...form } : l)),
        );
        toast({
          title: 'Success',
          description: 'The lesson has been updated successfully.',
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: error?.message || 'Failed to update lesson',
          variant: 'destructive',
        });
      } finally {
        setModal(false);
      }
    } else {
      try {
        const response = await createLesson({
          id: parentId,
          data: {
            name: form.name,
            description: form.description,
            type: form.type,
            status: form.status,
            xpPoints: form.xp_points,
            durationMinutes: form.duration_minutes,
            position: form.position,
            accessType: form.access_type,
          },
        });
        setLessons((ls) => [...ls, response?.data]);
        toast({
          title: 'Success',
          description: 'The lesson has been created successfully.',
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: error?.message || 'Failed to create lesson',
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
      await deleteLesson(id);
      const quizIds = quizzes
        .filter((q) => q.lesson_id === id)
        .map((q) => q.id);
      setQuizOptions((os) => os.filter((o) => !quizIds.includes(o.quiz_id)));
      setQuizzes((qs) => qs.filter((q) => q.lesson_id !== id));
      setLessonContents((cs) => cs.filter((c) => c.lesson_id !== id));
      setLessons((ls) => ls.filter((l) => l.id !== id));
      toast({
        title: 'Success',
        description: 'The lesson has been deleted successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error?.message || 'Failed to delete lesson',
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
