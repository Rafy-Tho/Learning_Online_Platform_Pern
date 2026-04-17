import { useState } from "react";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { DataTable } from "../components/DataTable";
import { FormModal } from "../components/FormModal";
import { StatusBadge } from "../components/StatusBadge";
import { mockCourses, mockCategories, mockUsers } from "../data/mockData";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

export default function CoursesPage() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState(mockCourses);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const instructors = mockUsers.filter((u) => u.role === "INSTRUCTOR");
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    instructor_id: "",
    category_id: "",
    status: "DRAFT",
    level: "BEGINNER",
    access_type: "FREE",
  });

  const openCreate = () => {
    setEditing(null);
    setForm({
      name: "",
      slug: "",
      description: "",
      instructor_id: "",
      category_id: "",
      status: "DRAFT",
      level: "BEGINNER",
      access_type: "FREE",
    });
    setModalOpen(true);
  };

  const openEdit = (course) => {
    setEditing(course);
    setForm({
      name: course.name,
      slug: course.slug,
      description: course.description,
      instructor_id: course.instructor_id,
      category_id: course.category_id,
      status: course.status,
      level: course.level,
      access_type: course.access_type,
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.slug || !form.instructor_id || !form.category_id)
      return;
    const instructor = instructors.find((i) => i.id === form.instructor_id);
    const category = mockCategories.find((c) => c.id === form.category_id);
    if (editing) {
      setCourses((cs) =>
        cs.map((c) =>
          c.id === editing.id
            ? {
                ...c,
                ...form,
                instructor_name: instructor?.name,
                category_name: category?.name,
              }
            : c,
        ),
      );
    } else {
      setCourses((cs) => [
        ...cs,
        {
          id: crypto.randomUUID(),
          ...form,
          instructor_name: instructor?.name,
          category_name: category?.name,
          modules_count: 0,
          enrollments_count: 0,
          created_at: new Date().toISOString(),
        },
      ]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) =>
    setCourses((cs) => cs.filter((c) => c.id !== id));

  const columns = [
    {
      key: "name",
      header: "Course",
      render: (c) => (
        <div>
          <p className="font-medium text-foreground">{c.name}</p>
          <p className="text-xs text-muted-foreground">{c.category_name}</p>
        </div>
      ),
    },
    { key: "instructor_name", header: "Instructor" },
    {
      key: "level",
      header: "Level",
      render: (c) => (
        <span className="text-sm text-muted-foreground">{c.level}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (c) => <StatusBadge status={c.status} />,
    },
    {
      key: "access_type",
      header: "Access",
      render: (c) => <StatusBadge status={c.access_type} />,
    },
    {
      key: "enrollments_count",
      header: "Enrollments",
      render: (c) => (
        <span className="text-sm font-medium">{c.enrollments_count}</span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
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
        title={editing ? "Edit Course" : "Add Course"}
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
                  slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
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
              <label className="text-sm font-medium text-foreground">
                Instructor
              </label>
              <Select
                value={form.instructor_id}
                onValueChange={(v) =>
                  setForm((f) => ({ ...f, instructor_id: v }))
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  {instructors.map((i) => (
                    <SelectItem key={i.id} value={i.id}>
                      {i.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                  {mockCategories.map((c) => (
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
              {editing ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </FormModal>
    </div>
  );
}
