import { Pencil, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DataTable } from '../components/DataTable';
import { FormModal } from '../components/FormModal';
import { ErrorAlert } from '../components/ui/alert';
import { DeleteButton } from '../components/ui/alert-dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { DashboardSkeleton } from '../components/ui/skeleton';
import { Textarea } from '../components/ui/textarea';
import { useCreateCategory } from '../hooks/category/use-create-category';
import useDeleteCategory from '../hooks/category/use-delete-category';
import useGetCategories from '../hooks/category/use-get-categories';
import { useUpdateCategory } from '../hooks/category/use-update-category';
import { useToast } from '../hooks/use-toast';
export default function CategoriesPage() {
  const { data, isPending, error } = useGetCategories();
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', slug: '', description: '' });
  const { updateCategory, isPending: isUpdating } = useUpdateCategory();
  const { createCategory, isPending: isCreating } = useCreateCategory();
  const { deleteCategory, isPending: isDeleting } = useDeleteCategory();
  const { toast } = useToast();
  const openCreate = () => {
    setEditing(null);
    setForm({ name: '', slug: '', description: '' });
    setModalOpen(true);
  };

  const openEdit = (cat) => {
    setEditing(cat);
    setForm({
      name: cat.name,
      slug: cat.slug,
      description: cat.description || '',
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.slug) return;
    if (editing) {
      try {
        await updateCategory({ id: editing.id, category: form });
        setCategories((cats) =>
          cats.map((c) => (c.id === editing.id ? { ...c, ...form } : c)),
        );
        toast({
          title: 'Category updated',
          description: 'The category has been updated successfully.',
        });
        setModalOpen(false);
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message || 'Failed to update category.',
          variant: 'destructive',
        });
      }
    } else {
      try {
        const response = await createCategory(form);
        toast({
          title: 'Category created',
          description: 'The category has been created successfully.',
        });
        setCategories((cats) => [...cats, response.data]);
        setModalOpen(false);
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message || 'Failed to create category.',
          variant: 'destructive',
        });
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory(id);
      setCategories((cats) => cats.filter((c) => c.id !== id));
      toast({
        title: 'Category deleted',
        description: 'The category has been deleted successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete category.',
        variant: 'destructive',
      });
    }
  };

  const columns = [
    { key: 'name', header: 'Name' },
    {
      key: 'slug',
      header: 'Slug',
      render: (c) => (
        <span className="text-muted-foreground font-mono text-sm">
          {c.slug}
        </span>
      ),
    },
    {
      key: 'description',
      header: 'Description',
      render: (c) => (
        <span className="text-muted-foreground text-sm truncate max-w-[200px] block">
          {c.description || '—'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
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
          <DeleteButton
            onDelete={() => handleDelete(c.id)}
            isDeleting={isDeleting}
          />
        </div>
      ),
    },
  ];
  useEffect(() => {
    if (data) {
      setCategories([...data.data]);
    }
  }, [data]);
  if (isPending) return <DashboardSkeleton />;
  if (error) return <ErrorAlert message={error.message} />;
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
        title={editing ? 'Edit Category' : 'Add Category'}
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
                  slug: e.target.value.toLowerCase().replace(/\s+/g, '-'),
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
            <Button onClick={handleSave} disabled={isUpdating}>
              {editing
                ? isUpdating
                  ? 'Updating...'
                  : 'Update'
                : isCreating
                  ? 'Creating...'
                  : 'Create'}
            </Button>
          </div>
        </div>
      </FormModal>
    </div>
  );
}
