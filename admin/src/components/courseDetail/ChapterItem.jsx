import { ChevronDown, ChevronRight, Pencil, Plus, Trash2 } from 'lucide-react';
import { StatusBadge } from '../StatusBadge';
import { Button } from '../ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { LessonItem } from './LessonItem';

export function ChapterItem({
  chapter,
  isExpanded,
  lessons,
  lessonContents,
  quizzes,
  quizOptions,
  expandedLessons,
  onToggle,
  onAddLesson,
  onEdit,
  onDelete,
  onToggleLesson,
  onAddContent,
  onAddQuiz,
  onEditLesson,
  onDeleteLesson,
  onEditContent,
  onDeleteContent,
  onEditQuiz,
  onDeleteQuiz,
}) {
  const chapterLessons = lessons
    .filter((l) => l.chapter_id === chapter.id)
    .sort((a, b) => a.position - b.position);

  return (
    <Collapsible open={isExpanded} onOpenChange={onToggle}>
      <CollapsibleTrigger asChild>
        <div className="flex items-center gap-3 py-3 px-3 cursor-pointer hover:bg-accent/20 rounded-lg mt-2 transition-colors">
          {isExpanded ? (
            <ChevronDown className="h-3.5 w-3.5" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5" />
          )}
          <div className="flex-1 min-w-0 flex items-center gap-2">
            <span className="text-xs font-medium text-accent-foreground bg-accent rounded px-2 py-0.5">
              Ch {chapter.position}
            </span>
            <span className="font-medium text-foreground text-sm">
              {chapter.name}
            </span>
            <StatusBadge status={chapter.status} />
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={(e) => {
                e.stopPropagation();
                onAddLesson(chapter.id);
              }}
              title="Add Lesson"
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(chapter);
              }}
              title="Edit Chapter"
            >
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-destructive hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(chapter);
              }}
              title="Delete Chapter"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent>
        <div className="ml-8 space-y-1 pb-2">
          {chapterLessons.map((lesson) => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              isExpanded={expandedLessons.has(lesson.id)}
              lessonContents={lessonContents
                .filter((lc) => lc.lesson_id === lesson.id)
                .sort((a, b) => a.position - b.position)}
              lessonQuizzes={quizzes
                .filter((q) => q.lesson_id === lesson.id)
                .sort((a, b) => a.position - b.position)}
              quizOptions={quizOptions}
              onToggle={() => onToggleLesson(lesson.id)}
              onAddContent={onAddContent}
              onAddQuiz={onAddQuiz}
              onEdit={onEditLesson}
              onDelete={onDeleteLesson}
              onEditContent={onEditContent}
              onDeleteContent={onDeleteContent}
              onEditQuiz={onEditQuiz}
              onDeleteQuiz={onDeleteQuiz}
            />
          ))}
          {chapterLessons.length === 0 && (
            <p className="text-xs text-muted-foreground py-2 px-3">
              No lessons yet
            </p>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
