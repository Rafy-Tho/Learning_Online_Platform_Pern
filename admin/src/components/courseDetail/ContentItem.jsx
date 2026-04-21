import { List, Pencil, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

export function ContentItem({ lc, onEdit, onDelete }) {
  return (
    <div className="flex items-center gap-2 py-1.5 px-3 rounded-md hover:bg-accent/10 transition-colors group/content">
      <List className="h-3 w-3 text-muted-foreground" />
      <span className="text-xs font-medium text-muted-foreground">
        #{lc.position}
      </span>
      <span className="text-sm text-foreground flex-1">{lc.name}</span>
      <span className="text-xs text-muted-foreground truncate max-w-[200px]">
        {lc.content.slice(0, 50)}...
      </span>
      <div className="flex gap-1 opacity-0 group-hover/content:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => onEdit(lc)}
          title="Edit Content"
        >
          <Pencil className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6 text-destructive hover:text-destructive"
          onClick={() => onDelete(lc)}
          title="Delete Content"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
}
