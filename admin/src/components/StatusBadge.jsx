import { Badge } from "./ui/badge";

const statusStyles = {
  PUBLISHED: "bg-success/15 text-success border-success/30",
  DRAFT: "bg-warning/15 text-warning border-warning/30",
  ACTIVE: "bg-success/15 text-success border-success/30",
  INACTIVE: "bg-muted text-muted-foreground border-muted",
  SUSPENDED: "bg-destructive/15 text-destructive border-destructive/30",
  FREE: "bg-info/15 text-info border-info/30",
  SUBSCRIPTION: "bg-primary/15 text-primary border-primary/30",
  EXPIRED: "bg-muted text-muted-foreground border-muted",
  CANCELLED: "bg-destructive/15 text-destructive border-destructive/30",
  PENDING: "bg-warning/15 text-warning border-warning/30",
  COMPLETED: "bg-success/15 text-success border-success/30",
  FAILED: "bg-destructive/15 text-destructive border-destructive/30",
  REFUNDED: "bg-info/15 text-info border-info/30",
};

export function StatusBadge({ status }) {
  return (
    <Badge
      variant="outline"
      className={`text-xs font-medium ${statusStyles[status] || ""}`}
    >
      {status}
    </Badge>
  );
}
