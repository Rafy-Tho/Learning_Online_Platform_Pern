export function StatsCard({ title, value, icon: Icon, trend, trendUp }) {
  return (
    <div className="glass-card rounded-xl p-6 transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
          {trend && (
            <p
              className={`mt-1 text-sm font-medium ${trendUp ? "text-success" : "text-destructive"}`}
            >
              {trend}
            </p>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
    </div>
  );
}
