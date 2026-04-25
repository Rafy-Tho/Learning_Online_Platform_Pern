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

export function PaymentModal({
  open,
  onOpenChange,
  editing,
  form,
  setForm,
  onSave,
  subscriptions,
}) {
  return (
    <FormModal
      open={open}
      onOpenChange={onOpenChange}
      title={editing ? 'Edit Payment' : 'Add Payment'}
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground">
            Subscription
          </label>
          <Select
            value={form.user_subscription_id}
            onValueChange={(v) =>
              setForm((f) => ({ ...f, user_subscription_id: v }))
            }
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select subscription" />
            </SelectTrigger>
            <SelectContent>
              {subscriptions.map((s) => (
                <SelectItem key={s.id} value={s.id}>
                  {s.user_name} - {s.plan_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground">
              Amount ($)
            </label>
            <Input
              type="number"
              step="0.01"
              value={form.amount}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  amount: parseFloat(e.target.value) || 0,
                }))
              }
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">
              Status
            </label>
            <Select
              value={form.payment_status}
              onValueChange={(v) =>
                setForm((f) => ({ ...f, payment_status: v }))
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="FAILED">Failed</SelectItem>
                <SelectItem value="REFUNDED">Refunded</SelectItem>
              </SelectContent>
            </Select>
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
