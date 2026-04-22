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

export function LessonModal({
  open,
  onOpenChange,
  form,
  onChange,
  onSave,
  isEditing,
  isUpdating,
  isCreating,
}) {
  return (
    <FormModal
      open={open}
      onOpenChange={onOpenChange}
      title={isEditing ? 'Edit Lesson' : 'Add Lesson'}
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground">Name</label>
          <Input
            value={form.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="Lesson name"
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
            placeholder="Lesson position"
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground">Access</label>
          <Select
            value={form.access_type}
            onValueChange={(v) => onChange('access_type', v)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FREE">Free</SelectItem>
              <SelectItem value="SUBSCRIPTION">Subscription</SelectItem>
            </SelectContent>
          </Select>
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground">Type</label>
            <Select
              value={form.type}
              onValueChange={(v) => onChange('type', v)}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TEXT">Text</SelectItem>
                <SelectItem value="QUIZ">Quiz</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">
              Status
            </label>
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
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground">
              XP Points
            </label>
            <Input
              type="number"
              value={form.xp_points}
              onChange={(e) =>
                onChange('xp_points', parseInt(e.target.value) || 0)
              }
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">
              Duration (min)
            </label>
            <Input
              type="number"
              value={form.duration_minutes}
              onChange={(e) =>
                onChange('duration_minutes', parseInt(e.target.value) || 0)
              }
              className="mt-1"
            />
          </div>
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
