import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { DataTable } from '../components/DataTable';
import { FormModal } from '../components/FormModal';
import PaginatedTable from '../components/PaginationTable';
import { StatusBadge } from '../components/StatusBadge';
import { ErrorAlert } from '../components/ui/alert';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { DashboardSkeleton } from '../components/ui/skeleton';
import { Textarea } from '../components/ui/textarea';
import useGetCategories from '../hooks/category/use-get-categories';
import { useCreateCourse } from '../hooks/course/use-create-course';
import { useGetCourses } from '../hooks/course/use-get-courses';
import { useUpdateCourse } from '../hooks/course/use-update-course';
import { toast } from '../hooks/use-toast';

export default function CoursesPage() {
  const [searchParams] = useSearchParams();
  const { updateCourse, isPending: isUpdating } = useUpdateCourse();
  const { createCourse, isCreating } = useCreateCourse();
  const { data, isPending, error } = useGetCourses(searchParams);
  const { data: categoriesData } = useGetCategories();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    position: '',
    category_id: '',
    status: 'DRAFT',
    level: 'BEGINNER',
    access_type: 'FREE',
  });
  const totalPage = data?.pagination.totalPages || 1;
  const openCreate = () => {
    setEditing(null);
    setForm({
      name: '',
      slug: '',
      description: '',
      position: '',
      category_id: '',
      status: 'DRAFT',
      level: 'BEGINNER',
      access_type: 'FREE',
    });
    setModalOpen(true);
  };

  const openEdit = (course) => {
    setEditing(course);
    setForm({
      name: course.name,
      slug: course.slug,
      description: course.description,
      position: course.position,
      category_id: course.category_id,
      status: course.status,
      level: course.level,
      access_type: course.access_type,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.slug || !form.category_id) return;
    const data = {
      name: form.name,
      slug: form.slug,
      description: form.description,
      position: form.position,
      categoryId: form.category_id,
      status: form.status,
      level: form.level,
      accessType: form.access_type,
    };
    if (editing) {
      try {
        await updateCourse({ id: editing.id, data });
        setCourses((cs) =>
          cs.map((c) =>
            c.id === editing.id
              ? {
                  ...c,
                  ...form,
                }
              : c,
          ),
        );
        toast({
          title: 'Success',
          description: 'Course updated successfully',
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message || 'Failed to update course',
          variant: 'destructive',
        });
      } finally {
        setModalOpen(false);
      }
    } else {
      try {
        const result = await createCourse(data);
        setCourses((cs) => [result?.data, ...cs]);
        toast({
          title: 'Success',
          description: 'Course created successfully',
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message || 'Failed to create course',
          variant: 'destructive',
        });
      } finally {
        setModalOpen(false);
      }
    }
  };

  const handleDelete = (id) => {
    setDeleteTarget(id);
  };

  // Delete handler
  const confirmDelete = () => {
    if (!deleteTarget) return;
    setCourses((cs) => cs.filter((c) => c.id !== deleteTarget));
    setDeleteTarget(null);
  };
  const columns = [
    {
      key: 'name',
      header: 'Course',
      render: (c) => (
        <div>
          <p className="font-medium text-foreground">{c.name}</p>
        </div>
      ),
    },

    {
      key: 'level',
      header: 'Level',
      render: (c) => (
        <span className="text-sm text-muted-foreground">{c.level}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (c) => <StatusBadge status={c.status} />,
    },
    {
      key: 'access_type',
      header: 'Access',
      render: (c) => <StatusBadge status={c.access_type} />,
    },
    {
      key: 'enrollments_count',
      header: 'Enrollments',
      render: (c) => (
        <span className="text-sm font-medium">{c.enrollments_count}</span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (c) => (
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/courses/${c.id}`);
            }}
          >
            <Eye className="h-4 w-4" />
          </Button>
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
  useEffect(() => {
    if (data?.data) {
      setCourses(data.data);
    }
  }, [data?.data]);
  useEffect(() => {
    if (categoriesData?.data) {
      setCategories(categoriesData.data);
    }
  }, [categoriesData?.data]);
  if (isPending) return <DashboardSkeleton />;
  if (error) return <ErrorAlert message={error.message} />;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Courses</h1>
          <p className="text-muted-foreground mt-1">Manage all courses</p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="h-4 w-4" /> Add Course
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={courses}
        onRowClick={(c) => navigate(`/courses/${c.id}`)}
      />

      <FormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        title={editing ? 'Edit Course' : 'Add Course'}
      >
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
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
              placeholder="Course name"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">Slug</label>
            <Input
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
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
              className="mt-1"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  Position
                </label>
                <Input
                  value={form.position}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      position: e.target.value,
                    }))
                  }
                  placeholder="Position"
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">
                Category
              </label>
              <Select
                value={form.category_id}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, category_id: v }))
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
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
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">
                Level
              </label>
              <Select
                value={form.level}
                onValueChange={(v) => setForm((f) => ({ ...f, level: v }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BEGINNER">Beginner</SelectItem>
                  <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                  <SelectItem value="ADVANCED">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">
                Access
              </label>
              <Select
                value={form.access_type}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, access_type: v }))
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FREE">Free</SelectItem>
                  <SelectItem value="SUBSCRIPTION">Subscription</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
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
      {/* Pagination */}
      {totalPage > 1 && <PaginatedTable totalPage={totalPage} />}
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
