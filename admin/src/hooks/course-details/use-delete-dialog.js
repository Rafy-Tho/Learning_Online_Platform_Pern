import { useState } from 'react';

export function useDeleteDialog({
  onDeleteObjective,
  onDeleteModule,
  onDeleteChapter,
  onDeleteLesson,
  onDeleteContent,
  onDeleteQuiz,
}) {
  const [deleteDialog, setDeleteDialog] = useState(null);

  const confirm = (type, id, name) => setDeleteDialog({ type, id, name });
  const cancel = () => setDeleteDialog(null);

  const execute = () => {
    if (!deleteDialog) return;
    const { type, id } = deleteDialog;

    if (type === 'objective') {
      onDeleteObjective(id);
    }

    if (type === 'module') {
      onDeleteModule(id);
    }

    if (type === 'chapter') {
      onDeleteChapter(id);
    }

    if (type === 'lesson') {
      onDeleteLesson(id);
    }

    if (type === 'content') {
      onDeleteContent(id);
    }

    if (type === 'quiz') {
      onDeleteQuiz(id);
    }
    cancel();
  };

  return { deleteDialog, confirm, cancel, execute };
}
