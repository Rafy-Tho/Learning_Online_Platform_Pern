import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { DataTable } from "../components/DataTable";
import { FormModal } from "../components/FormModal";
import { mockCategories } from "../data/mockData";
export default function CategoriesPage() {
  const [categories, setCategories] = useState(mockCategories);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", slug: "", description: "" });

  const openCreate = () => {
    setEditing(null);
    setForm({ name: "", slug: "", description: "" });
    setModalOpen(true);
  };

  const openEdit = (cat) => {
    setEditing(cat);
    setForm({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || "",
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.slug) return;
    if (editing) {
      setCategories((cats) =>
        cats.map((c) => (c.id === editing.id ? { ...c, ...form } : c)),
      );
    } else {
      setCategories((cats) => [
        ...cats,
        {
          id: crypto.randomUUID(),
          ...form,
          created_at: new Date().toISOString(),
        },
      ]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setCategories((cats) => cats.filter((c) => c.id !== id));
  };

  const columns = [
    { key: "name", header: "Name" },
    {
      key: "slug",
      header: "Slug",
      render: (c) => (
        <span className="text-muted-foreground font-mono text-sm">
          {c.slug}
        </span>
      ),
    },
    {
      key: "description",
      header: "Description",
      render: (c) => (
        <span className="text-muted-foreground text-sm truncate max-w-[200px] block">
          {c.description || "—"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      render: (c) => (
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              openEdit(c);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(c.id);
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
          <h1 className="text-2xl font-bold text-foreground">Categories</h1>
          <p className="text-muted-foreground mt-1">Manage course categories</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="h-4 w-4" /> Add Category
        </Button>
      </div>

      <DataTable columns={columns} data={categories} />

      <FormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={editing ? "Edit Category" : "Add Category"}
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Name</label>
            <Input
              value={form.name}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  name: e.target.value,
                  slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                }))
              }
              placeholder="Category name"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Slug</label>
            <Input
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              placeholder="category-slug"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">
              Description
            </label>
            <Textarea
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              placeholder="Optional description"
              className="mt-1"
            />
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
