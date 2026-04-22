import { Plus } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChapterModal } from '../components/courseDetail/ChapterModal';
import { ContentModal } from '../components/courseDetail/ContentModal';
import { CourseHeader } from '../components/courseDetail/CourseHeader';
import { DeleteConfirmDialog } from '../components/courseDetail/DeleteConfirmDialog';
import { LessonModal } from '../components/courseDetail/LessonModal';
import { ModuleCard } from '../components/courseDetail/ModuleCard';
import { ModuleModal } from '../components/courseDetail/ModuleModal';
import { ObjectivesCard } from '../components/courseDetail/ObjectivesCard';
import { QuizModal } from '../components/courseDetail/QuizModal';
import { ErrorAlert } from '../components/ui/alert';
import { Button } from '../components/ui/button';
import { DashboardSkeleton } from '../components/ui/skeleton';
import { useCourseDetail } from '../hooks/course-details/use-course-detail';
import { useGetCourseDetails } from '../hooks/course/use-get-course-details';

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetCourseDetails(courseId);

  const {
    course,
    modules,
    chapters,
    lessons,
    lessonContents,
    quizzes,
    quizOptions,
    expandedModules,
    expandedChapters,
    expandedLessons,
    toggleModule,
    toggleChapter,
    toggleLesson,
    objectives,
    objective,
    moduleCrud,
    chapterCrud,
    lessonCrud,
    contentCrud,
    quizCrud,
    deleteDialog,
  } = useCourseDetail(data);

  if (isLoading) return <DashboardSkeleton />;
  if (error) return <ErrorAlert message={error.message} />;
  if (Object.keys(course).length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Course not found</p>
        <Button
          variant="outline"
          onClick={() => navigate('/courses')}
          className="mt-4"
        >
          Back to Courses
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CourseHeader
        course={course}
        onBack={() => navigate('/courses')}
        onAddModule={moduleCrud.openCreate}
      />

      <ObjectivesCard
        objectives={objectives}
        editingIdx={objective.editingIdx}
        objectiveDraft={objective.draft}
        isUpdating={objective.isUpdating}
        addingObjective={objective.adding}
        newObjective={objective.newText}
        isCreating={objective.isCreating}
        onStartEdit={objective.startEdit}
        onSaveEdit={objective.saveEdit}
        onCancelEdit={objective.cancelEdit}
        onDraftChange={objective.setDraft}
        onEditKeyDown={objective.editKeyDown}
        onDeleteObjective={(o) =>
          deleteDialog.confirm('objective', o.id, o.content)
        }
        onStartAdd={objective.startAdd}
        onNewObjectiveChange={objective.setNewText}
        onAddObjective={objective.confirmAdd}
        onCancelAdd={objective.cancelAdd}
        onAddKeyDown={objective.addKeyDown}
      />

      <div className="space-y-3">
        {modules
          .sort((a, b) => a.position - b.position)
          .map((mod) => (
            <ModuleCard
              key={mod.id}
              module={mod}
              isExpanded={expandedModules.has(mod.id)}
              chapters={chapters}
              lessons={lessons}
              lessonContents={lessonContents}
              quizzes={quizzes}
              quizOptions={quizOptions}
              expandedChapters={expandedChapters}
              expandedLessons={expandedLessons}
              onToggle={() => toggleModule(mod.id)}
              onAddChapter={chapterCrud.openCreate}
              onEdit={moduleCrud.openEdit}
              onDelete={(m) => deleteDialog.confirm('module', m.id, m.name)}
              onToggleChapter={toggleChapter}
              onAddLesson={lessonCrud.openCreate}
              onToggleLesson={toggleLesson}
              onAddContent={contentCrud.openCreate}
              onAddQuiz={quizCrud.openCreate}
              onEditChapter={chapterCrud.openEdit}
              onDeleteChapter={(ch) =>
                deleteDialog.confirm('chapter', ch.id, ch.name)
              }
              onEditLesson={lessonCrud.openEdit}
              onDeleteLesson={(l) =>
                deleteDialog.confirm('lesson', l.id, l.name)
              }
              onEditContent={contentCrud.openEdit}
              onDeleteContent={(lc) =>
                deleteDialog.confirm('content', lc.id, lc.name)
              }
              onEditQuiz={quizCrud.openEdit}
              onDeleteQuiz={(q) =>
                deleteDialog.confirm('quiz', q.id, q.question.slice(0, 30))
              }
            />
          ))}

        {modules.length === 0 && (
          <div className="glass-card rounded-xl p-12 text-center">
            <p className="text-muted-foreground">
              No modules yet. Start building your course structure.
            </p>
            <Button onClick={moduleCrud.openCreate} className="mt-4 gap-2">
              <Plus className="h-4 w-4" /> Add First Module
            </Button>
          </div>
        )}
      </div>

      {/* Modals */}
      <ModuleModal
        open={moduleCrud.modal}
        onOpenChange={moduleCrud.setModal}
        form={moduleCrud.form}
        onChange={moduleCrud.onChange}
        onSave={moduleCrud.save}
        isEditing={!!moduleCrud.editing}
        isUpdating={moduleCrud.isUpdating}
        isCreating={moduleCrud.isCreating}
      />
      <ChapterModal
        open={chapterCrud.modal}
        onOpenChange={chapterCrud.setModal}
        form={chapterCrud.form}
        onChange={chapterCrud.onChange}
        onSave={chapterCrud.save}
        isEditing={!!chapterCrud.editing}
        isUpdating={chapterCrud.isUpdating}
        isCreating={chapterCrud.isCreating}
      />
      <LessonModal
        open={lessonCrud.modal}
        onOpenChange={lessonCrud.setModal}
        form={lessonCrud.form}
        onChange={lessonCrud.onChange}
        onSave={lessonCrud.save}
        isEditing={!!lessonCrud.editing}
        isUpdating={lessonCrud.isUpdating}
        isCreating={lessonCrud.isCreating}
      />
      <ContentModal
        open={contentCrud.modal}
        onOpenChange={contentCrud.setModal}
        form={contentCrud.form}
        onChange={contentCrud.onChange}
        onSave={contentCrud.save}
        isEditing={!!contentCrud.editing}
        isUpdating={contentCrud.isUpdating}
        isCreating={contentCrud.isCreating}
      />
      <QuizModal
        open={quizCrud.modal}
        onOpenChange={quizCrud.setModal}
        quizForm={quizCrud.quizForm}
        onQuizChange={quizCrud.onQuizChange}
        optionsForm={quizCrud.optionsForm}
        onOptionChange={quizCrud.onOptionChange}
        onAddOption={quizCrud.addOption}
        onRemoveOption={quizCrud.removeOption}
        onSave={quizCrud.save}
        isEditing={!!quizCrud.editing}
        isLoading={quizCrud.isLoading}
      />

      <DeleteConfirmDialog
        deleteDialog={deleteDialog.deleteDialog}
        onConfirm={deleteDialog.execute}
        onCancel={deleteDialog.cancel}
      />
    </div>
  );
}
