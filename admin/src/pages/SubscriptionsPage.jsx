import { useState } from 'react';
import { DeleteConfirmDialog } from '../components/subscriptions/DeleteConfirmDialog';
import { PaymentModal } from '../components/subscriptions/PaymentModal';
import { PaymentsTab } from '../components/subscriptions/PaymentsTab';
import { PlanModal } from '../components/subscriptions/PlanModal';
import { PlansTab } from '../components/subscriptions/PlansTab';
import { SubscriptionModal } from '../components/subscriptions/SubscriptionModal';
import { SubscriptionsTab } from '../components/subscriptions/SubscriptionsTab';
import { SubscriptionStats } from '../components/subscriptions/SubscriptionStats';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import { mockUsers } from '../data/mockData';
import { usePayments } from '../hooks/subscription/use-payment';
import { usePlans } from '../hooks/subscription/use-plan';
import { useSubscriptions } from '../hooks/subscription/use-subscription';

const learners = mockUsers.filter((u) => u.role === 'LEARNER');

export default function SubscriptionsPage() {
  const planHook = usePlans();
  const subHook = useSubscriptions();
  const payHook = usePayments();
  const [deleteTarget, setDeleteTarget] = useState(null);

  const activeCount = subHook.subscriptions.filter(
    (s) => s.status === 'ACTIVE',
  ).length;
  const totalRevenue = payHook.payments
    .filter((p) => p.payment_status === 'COMPLETED')
    .reduce((a, p) => a + p.amount, 0);

  const handleDelete = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === 'plan') planHook.remove(deleteTarget.id);
    if (deleteTarget.type === 'sub') subHook.remove(deleteTarget.id);
    if (deleteTarget.type === 'pay') payHook.remove(deleteTarget.id);
    setDeleteTarget(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Subscriptions</h1>
        <p className="text-muted-foreground mt-1">
          Manage plans, user subscriptions, and payments
        </p>
      </div>

      <SubscriptionStats
        planCount={planHook.plans.length}
        activeCount={activeCount}
        totalRevenue={totalRevenue}
      />

      <Tabs defaultValue="plans" className="w-full">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="subscriptions">User Subscriptions</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>
        <TabsContent value="plans">
          <PlansTab
            plans={planHook.plans}
            onAdd={planHook.openCreate}
            onEdit={planHook.openEdit}
            onDelete={(id) => setDeleteTarget({ type: 'plan', id })}
          />
        </TabsContent>
        <TabsContent value="subscriptions">
          <SubscriptionsTab
            subscriptions={subHook.subscriptions}
            onAdd={subHook.openCreate}
            onEdit={subHook.openEdit}
            onDelete={(id) => setDeleteTarget({ type: 'sub', id })}
          />
        </TabsContent>
        <TabsContent value="payments">
          <PaymentsTab
            payments={payHook.payments}
            onAdd={payHook.openCreate}
            onEdit={payHook.openEdit}
            onDelete={(id) => setDeleteTarget({ type: 'pay', id })}
          />
        </TabsContent>
      </Tabs>

      <PlanModal
        open={planHook.modalOpen}
        onOpenChange={planHook.setModalOpen}
        editing={planHook.editing}
        form={planHook.form}
        setForm={planHook.setForm}
        onSave={planHook.save}
      />

      <SubscriptionModal
        open={subHook.modalOpen}
        onOpenChange={subHook.setModalOpen}
        editing={subHook.editing}
        form={subHook.form}
        setForm={subHook.setForm}
        onSave={() => subHook.save(learners, planHook.plans)}
        learners={learners}
        plans={planHook.plans}
      />

      <PaymentModal
        open={payHook.modalOpen}
        onOpenChange={payHook.setModalOpen}
        editing={payHook.editing}
        form={payHook.form}
        setForm={payHook.setForm}
        onSave={() => payHook.save(subHook.subscriptions)}
        subscriptions={subHook.subscriptions}
      />

      <DeleteConfirmDialog
        target={deleteTarget}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
