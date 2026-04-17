import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { DataTable } from "../components/DataTable";
import { FormModal } from "../components/FormModal";
import { StatusBadge } from "../components/StatusBadge";
import { mockUsers } from "../data/mockData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export default function UsersPage({ filterRole, title, subtitle }) {
  const [users, setUsers] = useState(
    filterRole ? mockUsers.filter((u) => u.role === filterRole) : mockUsers,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: filterRole || "LEARNER",
    status: "ACTIVE",
  });

  const openCreate = () => {
    setEditing(null);
    setForm({
      name: "",
      email: "",
      role: filterRole || "LEARNER",
      status: "ACTIVE",
    });
    setModalOpen(true);
  };

  const openEdit = (user) => {
    setEditing(user);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.email) return;
    if (editing) {
      setUsers((us) =>
        us.map((u) => (u.id === editing.id ? { ...u, ...form } : u)),
      );
    } else {
      setUsers((us) => [
        ...us,
        {
          id: crypto.randomUUID(),
          ...form,
          created_at: new Date().toISOString(),
        },
      ]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => setUsers((us) => us.filter((u) => u.id !== id));

  const columns = [
    {
      key: "name",
      header: "User",
      render: (u) => (
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold text-sm">
            {u.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium text-foreground">{u.name}</p>
            <p className="text-xs text-muted-foreground">{u.email}</p>
          </div>
        </div>
      ),
    },
    ...(!filterRole
      ? [
          {
            key: "role",
            header: "Role",
            render: (u) => <StatusBadge status={u.role} />,
          },
        ]
      : []),
    {
      key: "status",
      header: "Status",
      render: (u) => <StatusBadge status={u.status} />,
    },
    {
      key: "created_at",
      header: "Joined",
      render: (u) => (
        <span className="text-sm text-muted-foreground">
          {new Date(u.created_at).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (u) => (
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              openEdit(u);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(u.id);
            }}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground mt-1">{subtitle}</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="h-4 w-4" /> Add{" "}
          {filterRole
            ? filterRole.charAt(0) + filterRole.slice(1).toLowerCase()
            : "User"}
        </Button>
      </div>

      <DataTable columns={columns} data={users} />

      <FormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={editing ? "Edit User" : "Add User"}
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Name</label>
            <Input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Email</label>
            <Input
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
              type="email"
              className="mt-1"
            />
          </div>
          {!filterRole && (
            <div>
              <label className="text-sm font-medium text-foreground">
                Role
              </label>
              <Select
                value={form.role}
                onValueChange={(v) => setForm((f) => ({ ...f, role: v }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LEARNER">Learner</SelectItem>
                  <SelectItem value="INSTRUCTOR">Instructor</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <div>
            <label className="text-sm font-medium text-foreground">
              Status
            </label>
            <Select
              value={form.status}
              onValueChange={(v) => setForm((f) => ({ ...f, status: v }))}
            >
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
                <SelectItem value="SUSPENDED">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editing ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </FormModal>
    </div>
  );
}
