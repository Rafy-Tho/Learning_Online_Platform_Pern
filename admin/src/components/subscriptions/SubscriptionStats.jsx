import { CreditCard, DollarSign, Users } from 'lucide-react';
import { StatsCard } from '../StatsCard';

export function SubscriptionStats({ planCount, activeCount, totalRevenue }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatsCard title="Total Plans" value={planCount} icon={CreditCard} />
      <StatsCard
        title="Active Subscriptions"
        value={activeCount}
        icon={Users}
      />
      <StatsCard
        title="Total Revenue"
        value={`$${totalRevenue.toFixed(2)}`}
        icon={DollarSign}
      />
    </div>
  );
}
