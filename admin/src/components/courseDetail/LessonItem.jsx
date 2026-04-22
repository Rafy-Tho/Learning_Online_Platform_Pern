import {
  BookOpen,
  ChevronDown,
  ChevronRight,
  FileText,
  HelpCircle,
  Pencil,
  Plus,
  Trash2,
} from 'lucide-react';
import { StatusBadge } from '../StatusBadge';
import { Button } from '../ui/button';
import { ContentItem } from './ContentItem';
import { QuizItem } from './QuizItem';

export function LessonItem({
  lesson,
  isExpanded,
  lessonContents,
  lessonQuizzes,
  quizOptions,
  onToggle,
  onAddContent,
  onAddQuiz,
  onEdit,
  onDelete,
  onEditContent,
  onDeleteContent,
  onEditQuiz,
  onDeleteQuiz,
}) {
  const hasChildren = lessonContents.length > 0 || lessonQuizzes.length > 0;

  return (
    <div>
      {/* Lesson row */}
      <div
        className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-accent/10 transition-colors group cursor-pointer"
        onClick={onToggle}
      >
        {hasChildren ? (
          isExpanded ? (
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
          )
        ) : (
          <div className="w-3" />
        )}

        {lesson.type === 'TEXT' ? (
          <FileText className="h-3.5 w-3.5 text-primary" />
        ) : (
          <HelpCircle className="h-3.5 w-3.5 text-amber-500" />
        )}

        <div className="flex-1 min-w-0 flex items-center gap-2">
          <span className="text-sm text-foreground">{lesson.name}</span>
          <StatusBadge status={lesson.status} />
          <span className="text-xs text-muted-foreground">
            {lesson.duration_minutes}min · {lesson.xp_points}XP
          </span>
        </div>

        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {lesson.type === 'TEXT' && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={(e) => {
                e.stopPropagation();
                onAddContent(lesson.id);
              }}
              title="Add Content"
            >
              <BookOpen className="h-3.5 w-3.5" />
            </Button>
          )}
          {lesson.type === 'QUIZ' && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={(e) => {
                e.stopPropagation();
                onAddQuiz(lesson.id);
              }}
              title="Add Quiz"
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(lesson);
            }}
            title="Edit Lesson"
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(lesson);
            }}
            title="Delete Lesson"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Expanded children */}
      {isExpanded && (
        <div className="ml-12 space-y-1 py-1">
          {lessonContents.map((lc) => (
            <ContentItem
              key={lc.id}
              lc={lc}
              onEdit={onEditContent}
              onDelete={onDeleteContent}
            />
          ))}

          {lessonQuizzes.map((q) => (
            <QuizItem
              key={q.id}
              quiz={q}
              options={quizOptions
                .filter((o) => o.quiz_id === q.id)
                .sort((a, b) => a.position - b.position)}
              onEdit={onEditQuiz}
              onDelete={onDeleteQuiz}
            />
          ))}

          {lessonContents.length === 0 && lessonQuizzes.length === 0 && (
            <p className="text-xs text-muted-foreground py-1 px-3">
              No content yet
            </p>
          )}
        </div>
      )}
    </div>
  );
}
