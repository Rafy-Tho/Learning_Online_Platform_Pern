import { Pencil, Plus, Trash2 } from 'lucide-react';
import { DataTable } from '../DataTable';
import { Button } from '../ui/button';

export function PlansTab({ plans, onAdd, onEdit, onDelete }) {
  const columns = [
    {
      key: 'name',
      header: 'Plan Name',
      render: (p) => (
        <span className="font-medium text-foreground">{p.name}</span>
      ),
    },
    {
      key: 'duration_days',
      header: 'Duration',
      render: (p) => (
        <span className="text-sm text-muted-foreground">
          {p.duration_days} days
        </span>
      ),
    },
    {
      key: 'price',
      header: 'Price',
      render: (p) => (
        <span className="text-sm font-semibold text-foreground">
          ${p.price.toFixed(2)}
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
          <Plus className="h-4 w-4" /> Add Plan
        </Button>
      </div>
      <DataTable columns={columns} data={plans} />
    </div>
  );
}
