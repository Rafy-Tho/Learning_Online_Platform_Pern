import {
  ChevronDown,
  ChevronRight,
  GripVertical,
  Pencil,
  Plus,
  Trash2,
} from 'lucide-react';
import { StatusBadge } from '../StatusBadge';
import { Button } from '../ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import { ChapterItem } from './ChapterItem';

export function ModuleCard({
  module,
  isExpanded,
  chapters,
  lessons,
  lessonContents,
  quizzes,
  quizOptions,
  expandedChapters,
  expandedLessons,
  onToggle,
  onAddChapter,
  onEdit,
  onDelete,
  onToggleChapter,
  onAddLesson,
  onToggleLesson,
  onAddContent,
  onAddQuiz,
  onEditChapter,
  onDeleteChapter,
  onEditLesson,
  onDeleteLesson,
  onEditContent,
  onDeleteContent,
  onEditQuiz,
  onDeleteQuiz,
}) {
  const moduleChapters = chapters
    .filter((ch) => ch.module_id === module.id)
    .sort((a, b) => a.position - b.position);

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <Collapsible open={isExpanded} onOpenChange={onToggle}>
        <CollapsibleTrigger asChild>
          <div className="flex items-center gap-3 p-4 cursor-pointer hover:bg-accent/30 transition-colors">
            <GripVertical className="h-4 w-4 text-muted-foreground" />
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-primary bg-primary/10 rounded px-2 py-0.5">
                  Module {module.position}
                </span>
                <span className="font-semibold text-foreground">
                  {module.name}
                </span>
                <StatusBadge status={module.status} />
              </div>
              {module.description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {module.description}
                </p>
              )}
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddChapter(module.id);
                }}
                title="Add Chapter"
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(module);
                }}
                title="Edit Module"
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(module);
                }}
                className="text-destructive hover:text-destructive"
                title="Delete Module"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="border-t border-border ml-11 mr-4 mb-4">
            {moduleChapters.map((ch) => (
              <ChapterItem
                key={ch.id}
                chapter={ch}
                isExpanded={expandedChapters.has(ch.id)}
                lessons={lessons}
                lessonContents={lessonContents}
                quizzes={quizzes}
                quizOptions={quizOptions}
                expandedLessons={expandedLessons}
                onToggle={() => onToggleChapter(ch.id)}
                onAddLesson={onAddLesson}
                onEdit={onEditChapter}
                onDelete={onDeleteChapter}
                onToggleLesson={onToggleLesson}
                onAddContent={onAddContent}
                onAddQuiz={onAddQuiz}
                onEditLesson={onEditLesson}
                onDeleteLesson={onDeleteLesson}
                onEditContent={onEditContent}
                onDeleteContent={onDeleteContent}
                onEditQuiz={onEditQuiz}
                onDeleteQuiz={onDeleteQuiz}
              />
            ))}
            {moduleChapters.length === 0 && (
              <p className="text-sm text-muted-foreground py-4 px-3">
                No chapters yet. Click + to add one.
              </p>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
