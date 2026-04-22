import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCreateOption } from '../options/use-create-content';
import { useDeleteOption } from '../options/use-delete-content';
import { useUpdateOption } from '../options/use-update-content';
import { useCreateQuestion } from '../questions/use-create-content';
import { useDeleteQuestion } from '../questions/use-delete-content';
import { useUpdateQuestion } from '../questions/use-update-content';
import { toast } from '../use-toast';

const DEFAULT_QUIZ = { question: '', explanation: '', position: '' };
const DEFAULT_OPTIONS = [
  { text: '', is_correct: false, position: 1 },
  { text: '', is_correct: false, position: 2 },
];

export function useQuizCrud({
  quizzes,
  setQuizzes,
  quizOptions,
  setQuizOptions,
}) {
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [parentId, setParentId] = useState('');
  const [quizForm, setQuizForm] = useState(DEFAULT_QUIZ);
  const [optionsForm, setOptionsForm] = useState(DEFAULT_OPTIONS);
  const [deletedOptionIds, setDeletedOptionIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { createQuestion } = useCreateQuestion();
  const { updateQuestion } = useUpdateQuestion();
  const { deleteQuestion } = useDeleteQuestion();

  const { createOption } = useCreateOption();
  const { updateOption } = useUpdateOption();
  const { deleteOption } = useDeleteOption();

  const params = useParams();
  const queryClient = useQueryClient();

  const openCreate = (lessonId) => {
    setParentId(lessonId);
    setEditing(null);
    setQuizForm(DEFAULT_QUIZ);
    setOptionsForm(DEFAULT_OPTIONS);
    setDeletedOptionIds([]);
    setModal(true);
  };

  const openEdit = (q) => {
    setParentId(q.lesson_id);
    setEditing(q);
    setQuizForm({ question: q.question, explanation: q.explanation || '' });
    const opts = quizOptions
      .filter((o) => o.quiz_id === q.id)
      .sort((a, b) => a.position - b.position);
    setOptionsForm(
      opts.length > 0
        ? opts.map((o) => ({
            id: o.id,
            text: o.text,
            is_correct: o.is_correct,
            position: o.position,
          }))
        : DEFAULT_OPTIONS,
    );
    setDeletedOptionIds([]);
    setModal(true);
  };

  const save = async () => {
    if (!quizForm.question) return;
    const quizId = editing?.id || crypto.randomUUID();
    setIsLoading(true);

    if (editing) {
      try {
        const response = await updateQuestion({
          id: editing.id,
          data: {
            question: quizForm.question,
            explanation: quizForm.explanation,
            position:
              quizzes.filter((q) => q.lesson_id === parentId).length + 1,
          },
        });
        setQuizzes((qs) =>
          qs.map((q) => (q.id === editing.id ? response?.data : q)),
        );

        // Delete removed options in parallel
        await Promise.all(deletedOptionIds.map((id) => deleteOption(id)));

        // Update existing options or create new ones in parallel
        const savedOptions = await Promise.all(
          optionsForm
            .filter((o) => o.text.trim())
            .map(async (o, i) => {
              if (o.id) {
                // existing option → update
                const res = await updateOption({
                  id: o.id,
                  data: {
                    text: o.text,
                    isCorrect: o.is_correct,
                    position: o.position ?? i + 1,
                  },
                });
                return res?.data;
              } else {
                // new option added during edit → create
                const res = await createOption({
                  id: editing.id,
                  data: {
                    text: o.text,
                    isCorrect: o.is_correct,
                    position: o.position ?? i + 1,
                  },
                });
                return res?.data;
              }
            }),
        );

        setQuizOptions((prev) => [
          ...prev.filter((o) => o.quiz_id !== quizId),
          ...savedOptions,
        ]);

        toast({
          title: 'Quiz updated successfully',
          description: 'The quiz has been updated successfully',
        });
        queryClient.invalidateQueries({
          queryKey: ['course-details', params.courseId],
        });
      } catch (err) {
        toast({
          title: 'Failed to update quiz',
          description:
            err?.message || 'An error occurred while updating the quiz',
          variant: 'destructive',
        });
      } finally {
        setDeletedOptionIds([]);
        setIsLoading(false);
        setModal(false);
      }
    } else {
      try {
        const response = await createQuestion({
          id: parentId,
          data: {
            question: quizForm.question,
            explanation: quizForm.explanation,
            position:
              quizzes.filter((q) => q.lesson_id === parentId).length + 1,
          },
        });
        setQuizzes((qs) => [...qs, response?.data]);

        // Create options in parallel
        const newOptions = await Promise.all(
          optionsForm
            .filter((o) => o.text.trim())
            .map(async (o, i) => {
              const res = await createOption({
                id: response?.data?.id,
                data: {
                  text: o.text,
                  isCorrect: o.is_correct,
                  position: i + 1,
                },
              });
              return res?.data;
            }),
        );

        setQuizOptions((prev) => [
          ...prev.filter((o) => o.quiz_id !== quizId),
          ...newOptions,
        ]);

        toast({
          title: 'Quiz created successfully',
          description: 'The quiz has been created successfully',
        });
        queryClient.invalidateQueries({
          queryKey: ['course-details', params.courseId],
        });
      } catch (err) {
        toast({
          title: 'Failed to create quiz',
          description:
            err?.message || 'An error occurred while creating the quiz',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
        setModal(false);
      }
    }
  };

  const onQuizChange = (field, value) =>
    setQuizForm((f) => ({ ...f, [field]: value }));

  const onOptionChange = (i, field, value) =>
    setOptionsForm((f) =>
      f.map((o, idx) =>
        field === 'is_correct'
          ? { ...o, is_correct: idx === i ? value : false }
          : idx === i
            ? { ...o, [field]: value }
            : o,
      ),
    );

  const addOption = () =>
    setOptionsForm((f) => [
      ...f,
      { text: '', is_correct: false, position: f.length + 1 },
    ]);

  const removeOption = (i) => {
    const option = optionsForm[i];
    if (option?.id) {
      setDeletedOptionIds((prev) => [...prev, option.id]);
    }
    setOptionsForm((f) => f.filter((_, idx) => idx !== i));
  };

  const remove = async (id) => {
    try {
      await deleteQuestion(id);
      setQuizOptions((os) => os.filter((o) => o.quiz_id !== id));
      setQuizzes((qs) => qs.filter((q) => q.id !== id));
      toast({
        title: 'Quiz deleted successfully',
        description: 'The quiz has been deleted successfully',
      });
    } catch (err) {
      toast({
        title: 'Failed to delete quiz',
        description:
          err?.message || 'An error occurred while deleting the quiz',
        variant: 'destructive',
      });
    }
  };

  return {
    modal,
    setModal,
    editing,
    quizForm,
    onQuizChange,
    optionsForm,
    onOptionChange,
    addOption,
    removeOption,
    openCreate,
    openEdit,
    save,
    remove,
    isLoading,
  };
}
