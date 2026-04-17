import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  CreditCard,
  Users,
  DollarSign,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { DataTable } from "../components/DataTable";
import { FormModal } from "../components/FormModal";
import { StatusBadge } from "../components/StatusBadge";
import { StatsCard } from "../components/StatsCard";
import {
  mockSubscriptionPlans,
  mockUserSubscriptions,
  mockSubscriptionPayments,
  mockUsers,
} from "../data/mockData";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";

export default function SubscriptionsPage() {
  // Plans state
  const [plans, setPlans] = useState(mockSubscriptionPlans);
  const [planModalOpen, setPlanModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [planForm, setPlanForm] = useState({
    name: "",
    duration_days: 30,
    price: 0,
  });

  // Subscriptions state
  const [subscriptions, setSubscriptions] = useState(mockUserSubscriptions);
  const [subModalOpen, setSubModalOpen] = useState(false);
  const [editingSub, setEditingSub] = useState(null);
  const [subForm, setSubForm] = useState({
    user_id: "",
    plan_id: "",
    start_date: "",
    end_date: "",
    status: "ACTIVE",
  });

  // Payments state
  const [payments, setPayments] = useState(mockSubscriptionPayments);
  const [payModalOpen, setPayModalOpen] = useState(false);
  const [editingPay, setEditingPay] = useState(null);
  const [payForm, setPayForm] = useState({
    user_subscription_id: "",
    amount: 0,
    payment_status: "PENDING",
  });

  // Delete dialog
  const [deleteTarget, setDeleteTarget] = useState(null);

  const learners = mockUsers.filter((u) => u.role === "LEARNER");

  // ---- Plans CRUD ----
  const openCreatePlan = () => {
    setEditingPlan(null);
    setPlanForm({ name: "", duration_days: 30, price: 0 });
    setPlanModalOpen(true);
  };
  const openEditPlan = (p) => {
    setEditingPlan(p);
    setPlanForm({
      name: p.name,
      duration_days: p.duration_days,
      price: p.price,
    });
    setPlanModalOpen(true);
  };
  const savePlan = () => {
    if (!planForm.name || planForm.price <= 0) return;
    if (editingPlan) {
      setPlans((ps) =>
        ps.map((p) => (p.id === editingPlan.id ? { ...p, ...planForm } : p)),
      );
    } else {
      setPlans((ps) => [
        ...ps,
        {
          id: crypto.randomUUID(),
          ...planForm,
          created_at: new Date().toISOString(),
        },
      ]);
    }
    setPlanModalOpen(false);
  };

  // ---- Subscriptions CRUD ----
  const openCreateSub = () => {
    setEditingSub(null);
    setSubForm({
      user_id: "",
      plan_id: "",
      start_date: "",
      end_date: "",
      status: "ACTIVE",
    });
    setSubModalOpen(true);
  };
  const openEditSub = (s) => {
    setEditingSub(s);
    setSubForm({
      user_id: s.user_id,
      plan_id: s.plan_id,
      start_date: s.start_date.slice(0, 10),
      end_date: s.end_date.slice(0, 10),
      status: s.status,
    });
    setSubModalOpen(true);
  };
  const saveSub = () => {
    if (!subForm.user_id || !subForm.plan_id) return;
    const user = learners.find((u) => u.id === subForm.user_id);
    const plan = plans.find((p) => p.id === subForm.plan_id);
    if (editingSub) {
      setSubscriptions((ss) =>
        ss.map((s) =>
          s.id === editingSub.id
            ? { ...s, ...subForm, user_name: user?.name, plan_name: plan?.name }
            : s,
        ),
      );
    } else {
      setSubscriptions((ss) => [
        ...ss,
        {
          id: crypto.randomUUID(),
          ...subForm,
          user_name: user?.name,
          plan_name: plan?.name,
          created_at: new Date().toISOString(),
        },
      ]);
    }
    setSubModalOpen(false);
  };

  // ---- Payments CRUD ----
  const openCreatePay = () => {
    setEditingPay(null);
    setPayForm({
      user_subscription_id: "",
      amount: 0,
      payment_status: "PENDING",
    });
    setPayModalOpen(true);
  };
  const openEditPay = (p) => {
    setEditingPay(p);
    setPayForm({
      user_subscription_id: p.user_subscription_id,
      amount: p.amount,
      payment_status: p.payment_status,
    });
    setPayModalOpen(true);
  };
  const savePay = () => {
    if (!payForm.user_subscription_id || payForm.amount <= 0) return;
    const sub = subscriptions.find(
      (s) => s.id === payForm.user_subscription_id,
    );
    if (editingPay) {
      setPayments((ps) =>
        ps.map((p) =>
          p.id === editingPay.id
            ? {
                ...p,
                ...payForm,
                user_name: sub?.user_name,
                plan_name: sub?.plan_name,
              }
            : p,
        ),
      );
    } else {
      setPayments((ps) => [
        ...ps,
        {
          id: crypto.randomUUID(),
          ...payForm,
          user_name: sub?.user_name,
          plan_name: sub?.plan_name,
          created_at: new Date().toISOString(),
        },
      ]);
    }
    setPayModalOpen(false);
  };

  // Delete handler
  const confirmDelete = () => {
    if (!deleteTarget) return;
    if (deleteTarget.type === "plan")
      setPlans((ps) => ps.filter((p) => p.id !== deleteTarget.id));
    if (deleteTarget.type === "sub")
      setSubscriptions((ss) => ss.filter((s) => s.id !== deleteTarget.id));
    if (deleteTarget.type === "pay")
      setPayments((ps) => ps.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  // Stats
  const activeCount = subscriptions.filter((s) => s.status === "ACTIVE").length;
  const totalRevenue = payments
    .filter((p) => p.payment_status === "COMPLETED")
    .reduce((a, p) => a + p.amount, 0);

  // Table columns
  const planCols = [
    {
      key: "name",
      header: "Plan Name",
      render: (p) => (
        <span className="font-medium text-foreground">{p.name}</span>
      ),
    },
    {
      key: "duration_days",
      header: "Duration",
      render: (p) => (
        <span className="text-sm text-muted-foreground">
          {p.duration_days} days
        </span>
      ),
    },
    {
      key: "price",
      header: "Price",
      render: (p) => (
        <span className="text-sm font-semibold text-foreground">
          ${p.price.toFixed(2)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (p) => (
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              openEditPlan(p);
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
              setDeleteTarget({ type: "plan", id: p.id });
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const subCols = [
    {
      key: "user_name",
      header: "User",
      render: (s) => (
        <span className="font-medium text-foreground">{s.user_name}</span>
      ),
    },
    {
      key: "plan_name",
      header: "Plan",
      render: (s) => (
        <span className="text-sm text-muted-foreground">{s.plan_name}</span>
      ),
    },
    {
      key: "start_date",
      header: "Start",
      render: (s) => (
        <span className="text-sm text-muted-foreground">
          {new Date(s.start_date).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "end_date",
      header: "End",
      render: (s) => (
        <span className="text-sm text-muted-foreground">
          {new Date(s.end_date).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (s) => <StatusBadge status={s.status} />,
    },
    {
      key: "actions",
      header: "Actions",
      render: (s) => (
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              openEditSub(s);
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
              setDeleteTarget({ type: "sub", id: s.id });
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  const payCols = [
    {
      key: "user_name",
      header: "User",
      render: (p) => (
        <span className="font-medium text-foreground">{p.user_name}</span>
      ),
    },
    {
      key: "plan_name",
      header: "Plan",
      render: (p) => (
        <span className="text-sm text-muted-foreground">{p.plan_name}</span>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      render: (p) => (
        <span className="text-sm font-semibold text-foreground">
          ${p.amount.toFixed(2)}
        </span>
      ),
    },
    {
      key: "payment_status",
      header: "Status",
      render: (p) => <StatusBadge status={p.payment_status} />,
    },
    {
      key: "created_at",
      header: "Date",
      render: (p) => (
        <span className="text-sm text-muted-foreground">
          {new Date(p.created_at).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (p) => (
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              openEditPay(p);
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
              setDeleteTarget({ type: "pay", id: p.id });
            }}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Subscriptions</h1>
        <p className="text-muted-foreground mt-1">
          Manage plans, user subscriptions, and payments
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard title="Total Plans" value={plans.length} icon={CreditCard} />
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

      <Tabs defaultValue="plans" className="w-full">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="subscriptions">User Subscriptions</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        {/* Plans Tab */}
        <TabsContent value="plans" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={openCreatePlan} className="gap-2">
              <Plus className="h-4 w-4" /> Add Plan
            </Button>
          </div>
          <DataTable columns={planCols} data={plans} />
        </TabsContent>

        {/* Subscriptions Tab */}
        <TabsContent value="subscriptions" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={openCreateSub} className="gap-2">
              <Plus className="h-4 w-4" /> Add Subscription
            </Button>
          </div>
          <DataTable columns={subCols} data={subscriptions} />
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-4">
          <div className="flex justify-end">
            <Button onClick={openCreatePay} className="gap-2">
              <Plus className="h-4 w-4" /> Add Payment
            </Button>
          </div>
          <DataTable columns={payCols} data={payments} />
        </TabsContent>
      </Tabs>

      {/* Plan Modal */}
      <FormModal
        open={planModalOpen}
        onOpenChange={setPlanModalOpen}
        title={editingPlan ? "Edit Plan" : "Add Plan"}
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">
              Plan Name
            </label>
            <Input
              value={planForm.name}
              onChange={(e) =>
                setPlanForm((f) => ({ ...f, name: e.target.value }))
              }
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
                value={planForm.duration_days}
                onChange={(e) =>
                  setPlanForm((f) => ({
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
                value={planForm.price}
                onChange={(e) =>
                  setPlanForm((f) => ({
                    ...f,
                    price: parseFloat(e.target.value) || 0,
                  }))
                }
                className="mt-1"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setPlanModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={savePlan}>
              {editingPlan ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </FormModal>

      {/* Subscription Modal */}
      <FormModal
        open={subModalOpen}
        onOpenChange={setSubModalOpen}
        title={editingSub ? "Edit Subscription" : "Add Subscription"}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">
                User
              </label>
              <Select
                value={subForm.user_id}
                onValueChange={(v) => setSubForm((f) => ({ ...f, user_id: v }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent>
                  {learners.map((u) => (
                    <SelectItem key={u.id} value={u.id}>
                      {u.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">
                Plan
              </label>
              <Select
                value={subForm.plan_id}
                onValueChange={(v) => setSubForm((f) => ({ ...f, plan_id: v }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select plan" />
                </SelectTrigger>
                <SelectContent>
                  {plans.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} - ${p.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">
                Start Date
              </label>
              <Input
                type="date"
                value={subForm.start_date}
                onChange={(e) =>
                  setSubForm((f) => ({ ...f, start_date: e.target.value }))
                }
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">
                End Date
              </label>
              <Input
                type="date"
                value={subForm.end_date}
                onChange={(e) =>
                  setSubForm((f) => ({ ...f, end_date: e.target.value }))
                }
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">
              Status
            </label>
            <Select
              value={subForm.status}
              onValueChange={(v) => setSubForm((f) => ({ ...f, status: v }))}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="EXPIRED">Expired</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setSubModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={saveSub}>
              {editingSub ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </FormModal>

      {/* Payment Modal */}
      <FormModal
        open={payModalOpen}
        onOpenChange={setPayModalOpen}
        title={editingPay ? "Edit Payment" : "Add Payment"}
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">
              Subscription
            </label>
            <Select
              value={payForm.user_subscription_id}
              onValueChange={(v) =>
                setPayForm((f) => ({ ...f, user_subscription_id: v }))
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
                value={payForm.amount}
                onChange={(e) =>
                  setPayForm((f) => ({
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
                value={payForm.payment_status}
                onValueChange={(v) =>
                  setPayForm((f) => ({ ...f, payment_status: v }))
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
            <Button variant="outline" onClick={() => setPayModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={savePay}>
              {editingPay ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </FormModal>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={() => setDeleteTarget(null)}
      >
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-foreground">
              Confirm Delete
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
