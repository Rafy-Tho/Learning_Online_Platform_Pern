import { FormModal } from '../FormModal';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';

export function ContentModal({
  open,
  onOpenChange,
  form,
  onChange,
  onSave,
  isEditing,
}) {
  return (
    <FormModal
      open={open}
      onOpenChange={onOpenChange}
      title={isEditing ? 'Edit Lesson Content' : 'Add Lesson Content'}
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground">Title</label>
          <Input
            value={form.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Content title"
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Content</label>
          <Textarea
            value={form.content}
            onChange={(e) => onChange('content', e.target.value)}
            placeholder="Write the lesson content..."
            className="mt-1 min-h-[150px]"
          />
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>{isEditing ? 'Update' : 'Create'}</Button>
        </div>
      </div>
    </FormModal>
  );
}
