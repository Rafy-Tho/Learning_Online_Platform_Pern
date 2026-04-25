import { FormModal } from '../FormModal';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export function PlanModal({
  open,
  onOpenChange,
  editing,
  form,
  setForm,
  onSave,
}) {
  return (
    <FormModal
      open={open}
      onOpenChange={onOpenChange}
      title={editing ? 'Edit Plan' : 'Add Plan'}
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground">
            Plan Name
          </label>
          <Input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="e.g. Pro Monthly"
            className="mt-1"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground">
              Duration (days)
            </label>
            <Input
              type="number"
              value={form.duration_days}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  duration_days: parseInt(e.target.value) || 0,
                }))
              }
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">
              Price ($)
            </label>
            <Input
              type="number"
              step="0.01"
              value={form.price}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  price: parseFloat(e.target.value) || 0,
                }))
              }
              className="mt-1"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>{editing ? 'Update' : 'Create'}</Button>
        </div>
      </div>
    </FormModal>
  );
}
