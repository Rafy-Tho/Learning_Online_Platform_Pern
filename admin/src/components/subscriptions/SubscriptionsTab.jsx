import { Pencil, Plus, Trash2 } from 'lucide-react';
import { DataTable } from '../DataTable';
import { StatusBadge } from '../StatusBadge';
import { Button } from '../ui/button';

export function SubscriptionsTab({ subscriptions, onAdd, onEdit, onDelete }) {
  const columns = [
    {
      key: 'user_name',
      header: 'User',
      render: (s) => (
        <span className="font-medium text-foreground">{s.user_name}</span>
      ),
    },
    {
      key: 'plan_name',
      header: 'Plan',
      render: (s) => (
        <span className="text-sm text-muted-foreground">{s.plan_name}</span>
      ),
    },
    {
      key: 'start_date',
      header: 'Start',
      render: (s) => (
        <span className="text-sm text-muted-foreground">
          {new Date(s.start_date).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'end_date',
      header: 'End',
      render: (s) => (
        <span className="text-sm text-muted-foreground">
          {new Date(s.end_date).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (s) => <StatusBadge status={s.status} />,
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (s) => (
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(s);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(s.id);
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={onAdd} className="gap-2">
          <Plus className="h-4 w-4" /> Add Subscription
        </Button>
      </div>
      <DataTable columns={columns} data={subscriptions} />
    </div>
  );
}
