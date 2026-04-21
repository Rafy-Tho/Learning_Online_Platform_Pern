import { useState } from 'react';

const DEFAULT_QUIZ = { question: '', explanation: '' };
const DEFAULT_OPTIONS = [
  { text: '', is_correct: false },
  { text: '', is_correct: false },
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

  const openCreate = (lessonId) => {
    setParentId(lessonId);
    setEditing(null);
    setQuizForm(DEFAULT_QUIZ);
    setOptionsForm(DEFAULT_OPTIONS);
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
        ? opts.map((o) => ({ text: o.text, is_correct: o.is_correct }))
        : DEFAULT_OPTIONS,
    );
    setModal(true);
  };

  const save = () => {
    if (!quizForm.question) return;
    const quizId = editing?.id || crypto.randomUUID();
    if (editing) {
      setQuizzes((qs) =>
        qs.map((q) => (q.id === editing.id ? { ...q, ...quizForm } : q)),
      );
    } else {
      const count = quizzes.filter((q) => q.lesson_id === parentId).length;
      setQuizzes((qs) => [
        ...qs,
        { id: quizId, lesson_id: parentId, position: count + 1, ...quizForm },
      ]);
    }
    const newOptions = optionsForm
      .filter((o) => o.text.trim())
      .map((o, i) => ({
        id: crypto.randomUUID(),
        quiz_id: quizId,
        text: o.text,
        is_correct: o.is_correct,
        position: i + 1,
      }));
    setQuizOptions((prev) => [
      ...prev.filter((o) => o.quiz_id !== quizId),
      ...newOptions,
    ]);
    setModal(false);
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
    setOptionsForm((f) => [...f, { text: '', is_correct: false }]);
  const removeOption = (i) =>
    setOptionsForm((f) => f.filter((_, idx) => idx !== i));

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
  };
}
