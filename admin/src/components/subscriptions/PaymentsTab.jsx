import { Pencil, Plus, Trash2 } from 'lucide-react';
import { DataTable } from '../DataTable';
import { StatusBadge } from '../StatusBadge';
import { Button } from '../ui/button';

export function PaymentsTab({ payments, onAdd, onEdit, onDelete }) {
  const columns = [
    {
      key: 'user_name',
      header: 'User',
      render: (p) => (
        <span className="font-medium text-foreground">{p.user_name}</span>
      ),
    },
    {
      key: 'plan_name',
      header: 'Plan',
      render: (p) => (
        <span className="text-sm text-muted-foreground">{p.plan_name}</span>
      ),
    },
    {
      key: 'amount',
      header: 'Amount',
      render: (p) => (
        <span className="text-sm font-semibold text-foreground">
          ${p.amount.toFixed(2)}
        </span>
      ),
    },
    {
      key: 'payment_status',
      header: 'Status',
      render: (p) => <StatusBadge status={p.payment_status} />,
    },
    {
      key: 'created_at',
      header: 'Date',
      render: (p) => (
        <span className="text-sm text-muted-foreground">
          {new Date(p.created_at).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (p) => (
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(p);
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
              onDelete(p.id);
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
          <Plus className="h-4 w-4" /> Add Payment
        </Button>
      </div>
      <DataTable columns={columns} data={payments} />
    </div>
  );
}
