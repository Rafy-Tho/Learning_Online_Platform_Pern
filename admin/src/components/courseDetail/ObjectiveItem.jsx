import { Check, Loader2, Pencil, Trash2, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function ObjectiveItem({
  obj,
  isEditing,
  draft,
  isUpdating,
  onStartEdit,
  onSave,
  onCancel,
  onDelete,
  onDraftChange,
  onKeyDown,
}) {
  return (
    <li className="flex items-start gap-2 text-sm text-foreground group">
      <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-primary shrink-0" />

      {isEditing ? (
        <>
          <Input
            autoFocus
            value={draft}
            onChange={(e) => onDraftChange(e.target.value)}
            onKeyDown={onKeyDown}
            className="h-8"
          />
          {isUpdating ? (
            <div className="h-8 w-8 flex items-center justify-center">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          ) : (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={onSave}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={onCancel}
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          )}
        </>
      ) : (
        <>
          <span className="flex-1 py-1">{obj.content}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={onStartEdit}
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
            onClick={onDelete}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </>
      )}
    </li>
  );
}
