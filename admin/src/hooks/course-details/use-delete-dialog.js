import { useState } from 'react';

export function useDeleteDialog({
  chapters,
  lessons,
  lessonContents,
  quizzes,
  quizOptions,
  setChapters,
  setLessons,
  setLessonContents,
  setQuizzes,
  setQuizOptions,
  setModules,
  onDeleteObjective,
}) {
  const [deleteDialog, setDeleteDialog] = useState(null);

  const confirm = (type, id, name) => setDeleteDialog({ type, id, name });
  const cancel = () => setDeleteDialog(null);

  const execute = () => {
    if (!deleteDialog) return;
    const { type, id } = deleteDialog;

    if (type === 'objective') {
      onDeleteObjective(id);
      cancel();
      return;
    }

    if (type === 'module') {
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
    }

    if (type === 'chapter') {
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
    }

    if (type === 'lesson') {
      const quizIds = quizzes
        .filter((q) => q.lesson_id === id)
        .map((q) => q.id);
      setQuizOptions((os) => os.filter((o) => !quizIds.includes(o.quiz_id)));
      setQuizzes((qs) => qs.filter((q) => q.lesson_id !== id));
      setLessonContents((cs) => cs.filter((c) => c.lesson_id !== id));
      setLessons((ls) => ls.filter((l) => l.id !== id));
    }

    if (type === 'content')
      setLessonContents((cs) => cs.filter((c) => c.id !== id));

    if (type === 'quiz') {
      setQuizOptions((os) => os.filter((o) => o.quiz_id !== id));
      setQuizzes((qs) => qs.filter((q) => q.id !== id));
    }

    cancel();
  };

  return { deleteDialog, confirm, cancel, execute };
}
