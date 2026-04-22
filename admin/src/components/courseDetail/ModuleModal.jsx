import { FormModal } from '../FormModal';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';

export function ModuleModal({
  open,
  onOpenChange,
  form,
  onChange,
  onSave,
  isEditing,
  isCreating,
  isUpdating,
}) {
  return (
    <FormModal
      open={open}
      onOpenChange={onOpenChange}
      title={isEditing ? 'Edit Module' : 'Add Module'}
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground">Name</label>
          <Input
            value={form.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Module name"
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">
            Position
          </label>
          <Input
            value={form.position}
            onChange={(e) => onChange('position', e.target.value)}
            placeholder="Module position"
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">
            Description
          </label>
          <Textarea
            value={form.description}
            onChange={(e) => onChange('description', e.target.value)}
            placeholder="Optional description"
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Status</label>
          <Select
            value={form.status}
            onValueChange={(v) => onChange('status', v)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DRAFT">Draft</SelectItem>
              <SelectItem value="PUBLISHED">Published</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>
            {isEditing
              ? isUpdating
                ? 'Updating...'
                : 'Update'
              : isCreating
                ? 'Creating...'
                : 'Create'}
          </Button>
        </div>
      </div>
    </FormModal>
  );
}
