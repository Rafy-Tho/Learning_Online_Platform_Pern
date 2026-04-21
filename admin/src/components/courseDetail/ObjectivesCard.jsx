import { Check, Loader2, Plus, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ObjectiveItem } from './ObjectiveItem';

export function ObjectivesCard({
  objectives,
  editingIdx,
  objectiveDraft,
  isUpdating,
  addingObjective,
  newObjective,
  isCreating,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onDraftChange,
  onEditKeyDown,
  onDeleteObjective,
  onStartAdd,
  onNewObjectiveChange,
  onAddObjective,
  onCancelAdd,
  onAddKeyDown,
}) {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wide">
          What You'll Learn
        </h2>
        {!addingObjective && (
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1"
            onClick={onStartAdd}
          >
            <Plus className="h-3.5 w-3.5" /> Add
          </Button>
        )}
      </div>

      {objectives.length === 0 && !addingObjective && (
        <p className="text-sm text-muted-foreground">
          No learning objectives yet. Click "Add" to create one.
        </p>
      )}

      <ul className="space-y-2">
        {objectives.map((obj, i) => (
          <ObjectiveItem
            key={obj.id ?? i}
            obj={obj}
            isEditing={editingIdx === i}
            draft={objectiveDraft}
            isUpdating={isUpdating}
            onStartEdit={() => onStartEdit(i, obj.content)}
            onSave={() => onSaveEdit(i)}
            onCancel={onCancelEdit}
            onDelete={() => onDeleteObjective(obj)}
            onDraftChange={onDraftChange}
            onKeyDown={(e) => onEditKeyDown(e, i)}
          />
        ))}
      </ul>

      {addingObjective && (
        <div className="flex items-center gap-2 mt-3">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
          <Input
            autoFocus
            value={newObjective}
            onChange={(e) => onNewObjectiveChange(e.target.value)}
            onKeyDown={onAddKeyDown}
            placeholder="e.g. Build production-ready React apps"
            className="h-8"
          />
          {isCreating ? (
            <div className="h-8 w-8 flex items-center justify-center">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          ) : (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={onAddObjective}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={onCancelAdd}
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
