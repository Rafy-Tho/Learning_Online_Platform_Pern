import { useChapterCrud } from './use-chapter-crud';
import { useContentCrud } from './use-content-crud';
import { useCourseData } from './use-course-data';
import { useDeleteDialog } from './use-delete-dialog';
import { useExpandCollapse } from './use-expand-collapse';
import { useLessonCrud } from './use-lesson-crud';
import { useModuleCrud } from './use-module-crud';
import { useObjectiveActions } from './use-objective-actions';
import { useQuizCrud } from './use-quiz-crud';

export function useCourseDetail(data) {
  const courseData = useCourseData(data);
  const {
    course,
    objectives,
    setObjectives,
    modules,
    setModules,
    chapters,
    setChapters,
    lessons,
    setLessons,
    lessonContents,
    setLessonContents,
    quizzes,
    setQuizzes,
    quizOptions,
    setQuizOptions,
  } = courseData;

  const expand = useExpandCollapse();

  const objective = useObjectiveActions({ objectives, setObjectives });

  const moduleCrud = useModuleCrud({
    setModules,
    modules,
    setChapters,
    setLessons,
    setQuizzes,
    setLessonContents,
    setQuizOptions,
    chapters,
    lessons,
    quizzes,
  });
  const chapterCrud = useChapterCrud({
    setChapters,
    lessons,
    quizzes,
    setQuizOptions,
    setQuizzes,
    setLessonContents,
    setLessons,
  });
  const lessonCrud = useLessonCrud({
    setLessons,
    quizzes,
    setQuizzes,
    setLessonContents,
    setQuizOptions,
  });
  const contentCrud = useContentCrud({ lessonContents, setLessonContents });
  const quizCrud = useQuizCrud({
    quizzes,
    setQuizzes,
    quizOptions,
    setQuizOptions,
  });

  const deleteDialog = useDeleteDialog({
    onDeleteObjective: objective.remove,
    onDeleteModule: moduleCrud.remove,
    onDeleteChapter: chapterCrud.remove,
    onDeleteLesson: lessonCrud.remove,
    onDeleteContent: contentCrud.remove,
  });

  return {
    // Data
    course,
    modules,
    chapters,
    lessons,
    lessonContents,
    quizzes,
    quizOptions,
    // Expand / collapse
    ...expand,
    // Objectives
    objectives,
    objective,
    // CRUD modals (modal state + handlers)
    moduleCrud,
    chapterCrud,
    lessonCrud,
    contentCrud,
    quizCrud,
    // Delete dialog
    deleteDialog,
  };
}
