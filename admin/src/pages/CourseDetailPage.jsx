import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  Pencil,
  Trash2,
  ChevronDown,
  ChevronRight,
  FileText,
  HelpCircle,
  GripVertical,
  BookOpen,
  List,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { FormModal } from "../components/FormModal";
import { StatusBadge } from "../components/StatusBadge";
import {
  mockCourses,
  mockModules,
  mockChapters,
  mockLessons,
  mockLessonContents,
  mockQuizzes,
  mockQuizOptions,
} from "../data/mockData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Switch } from "../components/ui/switch";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui/collapsible";
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

export default function CourseDetailPage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = mockCourses.find((c) => c.id === courseId);

  const [modules, setModules] = useState(
    mockModules.filter((m) => m.course_id === courseId),
  );
  const [chapters, setChapters] = useState(mockChapters);
  const [lessons, setLessons] = useState(mockLessons);
  const [lessonContents, setLessonContents] = useState(mockLessonContents);
  const [quizzes, setQuizzes] = useState(mockQuizzes);
  const [quizOptions, setQuizOptions] = useState(mockQuizOptions);

  const [expandedModules, setExpandedModules] = useState(new Set());
  const [expandedChapters, setExpandedChapters] = useState(new Set());
  const [expandedLessons, setExpandedLessons] = useState(new Set());

  // Modals
  const [moduleModal, setModuleModal] = useState(false);
  const [chapterModal, setChapterModal] = useState(false);
  const [lessonModal, setLessonModal] = useState(false);
  const [contentModal, setContentModal] = useState(false);
  const [quizModal, setQuizModal] = useState(false);

  const [editingModule, setEditingModule] = useState(null);
  const [editingChapter, setEditingChapter] = useState(null);
  const [editingLesson, setEditingLesson] = useState(null);
  const [editingContent, setEditingContent] = useState(null);
  const [editingQuiz, setEditingQuiz] = useState(null);

  const [parentId, setParentId] = useState("");

  // Delete confirmation
  const [deleteDialog, setDeleteDialog] = useState(null);

  // Forms
  const [moduleForm, setModuleForm] = useState({
    name: "",
    description: "",
    status: "DRAFT",
  });
  const [chapterForm, setChapterForm] = useState({
    name: "",
    description: "",
    status: "DRAFT",
  });
  const [lessonForm, setLessonForm] = useState({
    name: "",
    description: "",
    type: "TEXT",
    status: "DRAFT",
    xp_points: 10,
    duration_minutes: 15,
  });
  const [contentForm, setContentForm] = useState({ name: "", content: "" });
  const [quizForm, setQuizForm] = useState({ question: "", explanation: "" });
  const [optionsForm, setOptionsForm] = useState([
    { text: "", is_correct: false },
    { text: "", is_correct: false },
  ]);

  const toggleModule = (id) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  const toggleChapter = (id) => {
    setExpandedChapters((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };
  const toggleLesson = (id) => {
    setExpandedLessons((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // ========== Module CRUD ==========
  const openCreateModule = () => {
    setEditingModule(null);
    setModuleForm({ name: "", description: "", status: "DRAFT" });
    setModuleModal(true);
  };
  const openEditModule = (m) => {
    setEditingModule(m);
    setModuleForm({
      name: m.name,
      description: m.description || "",
      status: m.status,
    });
    setModuleModal(true);
  };
  const saveModule = () => {
    if (!moduleForm.name) return;
    if (editingModule) {
      setModules((ms) =>
        ms.map((m) =>
          m.id === editingModule.id ? { ...m, ...moduleForm } : m,
        ),
      );
    } else {
      setModules((ms) => [
        ...ms,
        {
          id: crypto.randomUUID(),
          course_id: courseId,
          position: ms.length + 1,
          ...moduleForm,
        },
      ]);
    }
    setModuleModal(false);
  };
  const confirmDeleteModule = (m) =>
    setDeleteDialog({ type: "module", id: m.id, name: m.name });

  // ========== Chapter CRUD ==========
  const openCreateChapter = (moduleId) => {
    setParentId(moduleId);
    setEditingChapter(null);
    setChapterForm({ name: "", description: "", status: "DRAFT" });
    setChapterModal(true);
  };
  const openEditChapter = (ch) => {
    setParentId(ch.module_id);
    setEditingChapter(ch);
    setChapterForm({
      name: ch.name,
      description: ch.description || "",
      status: ch.status,
    });
    setChapterModal(true);
  };
  const saveChapter = () => {
    if (!chapterForm.name) return;
    if (editingChapter) {
      setChapters((cs) =>
        cs.map((c) =>
          c.id === editingChapter.id ? { ...c, ...chapterForm } : c,
        ),
      );
    } else {
      const moduleChapters = chapters.filter((c) => c.module_id === parentId);
      setChapters((cs) => [
        ...cs,
        {
          id: crypto.randomUUID(),
          module_id: parentId,
          position: moduleChapters.length + 1,
          ...chapterForm,
        },
      ]);
    }
    setChapterModal(false);
  };
  const confirmDeleteChapter = (ch) =>
    setDeleteDialog({ type: "chapter", id: ch.id, name: ch.name });

  // ========== Lesson CRUD ==========
  const openCreateLesson = (chapterId) => {
    setParentId(chapterId);
    setEditingLesson(null);
    setLessonForm({
      name: "",
      description: "",
      type: "TEXT",
      status: "DRAFT",
      xp_points: 10,
      duration_minutes: 15,
    });
    setLessonModal(true);
  };
  const openEditLesson = (l) => {
    setParentId(l.chapter_id);
    setEditingLesson(l);
    setLessonForm({
      name: l.name,
      description: l.description || "",
      type: l.type,
      status: l.status,
      xp_points: l.xp_points,
      duration_minutes: l.duration_minutes,
    });
    setLessonModal(true);
  };
  const saveLesson = () => {
    if (!lessonForm.name) return;
    if (editingLesson) {
      setLessons((ls) =>
        ls.map((l) =>
          l.id === editingLesson.id ? { ...l, ...lessonForm } : l,
        ),
      );
    } else {
      const chapterLessons = lessons.filter((l) => l.chapter_id === parentId);
      setLessons((ls) => [
        ...ls,
        {
          id: crypto.randomUUID(),
          chapter_id: parentId,
          position: chapterLessons.length + 1,
          ...lessonForm,
        },
      ]);
    }
    setLessonModal(false);
  };
  const confirmDeleteLesson = (l) =>
    setDeleteDialog({ type: "lesson", id: l.id, name: l.name });

  // ========== Lesson Content CRUD ==========
  const openCreateContent = (lessonId) => {
    setParentId(lessonId);
    setEditingContent(null);
    setContentForm({ name: "", content: "" });
    setContentModal(true);
  };
  const openEditContent = (lc) => {
    setParentId(lc.lesson_id);
    setEditingContent(lc);
    setContentForm({ name: lc.name, content: lc.content });
    setContentModal(true);
  };
  const saveContent = () => {
    if (!contentForm.name || !contentForm.content) return;
    if (editingContent) {
      setLessonContents((cs) =>
        cs.map((c) =>
          c.id === editingContent.id ? { ...c, ...contentForm } : c,
        ),
      );
    } else {
      const existing = lessonContents.filter((c) => c.lesson_id === parentId);
      setLessonContents((cs) => [
        ...cs,
        {
          id: crypto.randomUUID(),
          lesson_id: parentId,
          position: existing.length + 1,
          ...contentForm,
        },
      ]);
    }
    setContentModal(false);
  };
  const confirmDeleteContent = (lc) =>
    setDeleteDialog({ type: "content", id: lc.id, name: lc.name });

  // ========== Quiz CRUD ==========
  const openCreateQuiz = (lessonId) => {
    setParentId(lessonId);
    setEditingQuiz(null);
    setQuizForm({ question: "", explanation: "" });
    setOptionsForm([
      { text: "", is_correct: false },
      { text: "", is_correct: false },
    ]);
    setQuizModal(true);
  };
  const openEditQuiz = (q) => {
    setParentId(q.lesson_id);
    setEditingQuiz(q);
    setQuizForm({ question: q.question, explanation: q.explanation || "" });
    const opts = quizOptions
      .filter((o) => o.quiz_id === q.id)
      .sort((a, b) => a.position - b.position);
    setOptionsForm(
      opts.length > 0
        ? opts.map((o) => ({ text: o.text, is_correct: o.is_correct }))
        : [
            { text: "", is_correct: false },
            { text: "", is_correct: false },
          ],
    );
    setQuizModal(true);
  };
  const saveQuiz = () => {
    if (!quizForm.question) return;
    const quizId = editingQuiz?.id || crypto.randomUUID();
    if (editingQuiz) {
      setQuizzes((qs) =>
        qs.map((q) => (q.id === editingQuiz.id ? { ...q, ...quizForm } : q)),
      );
    } else {
      const lessonQuizzes = quizzes.filter((q) => q.lesson_id === parentId);
      setQuizzes((qs) => [
        ...qs,
        {
          id: quizId,
          lesson_id: parentId,
          position: lessonQuizzes.length + 1,
          ...quizForm,
        },
      ]);
    }
    const newOptions = optionsForm
      .filter((o) => o.text.trim())
      .map((o, i) => ({
        id: crypto.randomUUID(),
        quiz_id: quizId,
        text: o.text,
        is_correct: o.is_correct,
        position: i + 1,
      }));
    setQuizOptions((prev) => [
      ...prev.filter((o) => o.quiz_id !== quizId),
      ...newOptions,
    ]);
    setQuizModal(false);
  };
  const confirmDeleteQuiz = (q) =>
    setDeleteDialog({ type: "quiz", id: q.id, name: q.question.slice(0, 30) });

  const addOption = () =>
    setOptionsForm((f) => [...f, { text: "", is_correct: false }]);
  const removeOption = (i) =>
    setOptionsForm((f) => f.filter((_, idx) => idx !== i));

  // ========== Execute Delete ==========
  const executeDelete = () => {
    if (!deleteDialog) return;
    const { type, id } = deleteDialog;
    switch (type) {
      case "module": {
        // Cascade: delete chapters, lessons, contents, quizzes under this module
        const moduleChapterIds = chapters
          .filter((c) => c.module_id === id)
          .map((c) => c.id);
        const moduleLessonIds = lessons
          .filter((l) => moduleChapterIds.includes(l.chapter_id))
          .map((l) => l.id);
        const moduleQuizIds = quizzes
          .filter((q) => moduleLessonIds.includes(q.lesson_id))
          .map((q) => q.id);
        setQuizOptions((os) =>
          os.filter((o) => !moduleQuizIds.includes(o.quiz_id)),
        );
        setQuizzes((qs) =>
          qs.filter((q) => !moduleLessonIds.includes(q.lesson_id)),
        );
        setLessonContents((cs) =>
          cs.filter((c) => !moduleLessonIds.includes(c.lesson_id)),
        );
        setLessons((ls) =>
          ls.filter((l) => !moduleChapterIds.includes(l.chapter_id)),
        );
        setChapters((cs) => cs.filter((c) => c.module_id !== id));
        setModules((ms) => ms.filter((m) => m.id !== id));
        break;
      }
      case "chapter": {
        const chapterLessonIds = lessons
          .filter((l) => l.chapter_id === id)
          .map((l) => l.id);
        const chapterQuizIds = quizzes
          .filter((q) => chapterLessonIds.includes(q.lesson_id))
          .map((q) => q.id);
        setQuizOptions((os) =>
          os.filter((o) => !chapterQuizIds.includes(o.quiz_id)),
        );
        setQuizzes((qs) =>
          qs.filter((q) => !chapterLessonIds.includes(q.lesson_id)),
        );
        setLessonContents((cs) =>
          cs.filter((c) => !chapterLessonIds.includes(c.lesson_id)),
        );
        setLessons((ls) => ls.filter((l) => l.chapter_id !== id));
        setChapters((cs) => cs.filter((c) => c.id !== id));
        break;
      }
      case "lesson": {
        const lessonQuizIds = quizzes
          .filter((q) => q.lesson_id === id)
          .map((q) => q.id);
        setQuizOptions((os) =>
          os.filter((o) => !lessonQuizIds.includes(o.quiz_id)),
        );
        setQuizzes((qs) => qs.filter((q) => q.lesson_id !== id));
        setLessonContents((cs) => cs.filter((c) => c.lesson_id !== id));
        setLessons((ls) => ls.filter((l) => l.id !== id));
        break;
      }
      case "content": {
        setLessonContents((cs) => cs.filter((c) => c.id !== id));
        break;
      }
      case "quiz": {
        setQuizOptions((os) => os.filter((o) => o.quiz_id !== id));
        setQuizzes((qs) => qs.filter((q) => q.id !== id));
        break;
      }
    }
    setDeleteDialog(null);
  };

  if (!course) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Course not found</p>
        <Button
          variant="outline"
          onClick={() => navigate("/courses")}
          className="mt-4"
        >
          Back to Courses
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/courses")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">{course.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <StatusBadge status={course.status} />
            <StatusBadge status={course.level} />
            <StatusBadge status={course.access_type} />
            <span className="text-sm text-muted-foreground">
              by {course.instructor_name}
            </span>
          </div>
        </div>
        <Button onClick={openCreateModule} className="gap-2">
          <Plus className="h-4 w-4" /> Add Module
        </Button>
      </div>

      {/* Modules tree */}
      <div className="space-y-3">
        {modules
          .sort((a, b) => a.position - b.position)
          .map((mod) => (
            <div key={mod.id} className="glass-card rounded-xl overflow-hidden">
              <Collapsible
                open={expandedModules.has(mod.id)}
                onOpenChange={() => toggleModule(mod.id)}
              >
                <CollapsibleTrigger asChild>
                  <div className="flex items-center gap-3 p-4 cursor-pointer hover:bg-accent/30 transition-colors">
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                    {expandedModules.has(mod.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-primary bg-primary/10 rounded px-2 py-0.5">
                          Module {mod.position}
                        </span>
                        <span className="font-semibold text-foreground">
                          {mod.name}
                        </span>
                        <StatusBadge status={mod.status} />
                      </div>
                      {mod.description && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {mod.description}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          openCreateChapter(mod.id);
                        }}
                        title="Add Chapter"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModule(mod);
                        }}
                        title="Edit Module"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                          e.stopPropagation();
                          confirmDeleteModule(mod);
                        }}
                        className="text-destructive hover:text-destructive"
                        title="Delete Module"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="border-t border-border ml-11 mr-4 mb-4">
                    {chapters
                      .filter((ch) => ch.module_id === mod.id)
                      .sort((a, b) => a.position - b.position)
                      .map((ch) => (
                        <Collapsible
                          key={ch.id}
                          open={expandedChapters.has(ch.id)}
                          onOpenChange={() => toggleChapter(ch.id)}
                        >
                          <CollapsibleTrigger asChild>
                            <div className="flex items-center gap-3 py-3 px-3 cursor-pointer hover:bg-accent/20 rounded-lg mt-2 transition-colors">
                              {expandedChapters.has(ch.id) ? (
                                <ChevronDown className="h-3.5 w-3.5" />
                              ) : (
                                <ChevronRight className="h-3.5 w-3.5" />
                              )}
                              <div className="flex-1 min-w-0 flex items-center gap-2">
                                <span className="text-xs font-medium text-accent-foreground bg-accent rounded px-2 py-0.5">
                                  Ch {ch.position}
                                </span>
                                <span className="font-medium text-foreground text-sm">
                                  {ch.name}
                                </span>
                                <StatusBadge status={ch.status} />
                              </div>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openCreateLesson(ch.id);
                                  }}
                                  title="Add Lesson"
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openEditChapter(ch);
                                  }}
                                  title="Edit Chapter"
                                >
                                  <Pencil className="h-3.5 w-3.5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 text-destructive hover:text-destructive"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    confirmDeleteChapter(ch);
                                  }}
                                  title="Delete Chapter"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </div>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <div className="ml-8 space-y-1 pb-2">
                              {lessons
                                .filter((l) => l.chapter_id === ch.id)
                                .sort((a, b) => a.position - b.position)
                                .map((lesson) => {
                                  const lessonContentItems = lessonContents
                                    .filter((lc) => lc.lesson_id === lesson.id)
                                    .sort((a, b) => a.position - b.position);
                                  const lessonQuizzes = quizzes
                                    .filter((q) => q.lesson_id === lesson.id)
                                    .sort((a, b) => a.position - b.position);
                                  const isExpanded = expandedLessons.has(
                                    lesson.id,
                                  );
                                  const hasChildren =
                                    lessonContentItems.length > 0 ||
                                    lessonQuizzes.length > 0;

                                  return (
                                    <div key={lesson.id}>
                                      <div
                                        className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-accent/10 transition-colors group cursor-pointer"
                                        onClick={() => toggleLesson(lesson.id)}
                                      >
                                        {hasChildren ? (
                                          isExpanded ? (
                                            <ChevronDown className="h-3 w-3 text-muted-foreground" />
                                          ) : (
                                            <ChevronRight className="h-3 w-3 text-muted-foreground" />
                                          )
                                        ) : (
                                          <div className="w-3" />
                                        )}
                                        {lesson.type === "TEXT" ? (
                                          <FileText className="h-3.5 w-3.5 text-primary" />
                                        ) : (
                                          <HelpCircle className="h-3.5 w-3.5 text-amber-500" />
                                        )}
                                        <div className="flex-1 min-w-0 flex items-center gap-2">
                                          <span className="text-sm text-foreground">
                                            {lesson.name}
                                          </span>
                                          <StatusBadge status={lesson.status} />
                                          <span className="text-xs text-muted-foreground">
                                            {lesson.duration_minutes}min ·{" "}
                                            {lesson.xp_points}XP
                                          </span>
                                        </div>
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                          {lesson.type === "TEXT" && (
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="h-7 w-7"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                openCreateContent(lesson.id);
                                              }}
                                              title="Add Content"
                                            >
                                              <BookOpen className="h-3.5 w-3.5" />
                                            </Button>
                                          )}
                                          {lesson.type === "QUIZ" && (
                                            <Button
                                              variant="ghost"
                                              size="icon"
                                              className="h-7 w-7"
                                              onClick={(e) => {
                                                e.stopPropagation();
                                                openCreateQuiz(lesson.id);
                                              }}
                                              title="Add Quiz"
                                            >
                                              <Plus className="h-3.5 w-3.5" />
                                            </Button>
                                          )}
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              openEditLesson(lesson);
                                            }}
                                            title="Edit Lesson"
                                          >
                                            <Pencil className="h-3.5 w-3.5" />
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-7 w-7 text-destructive hover:text-destructive"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              confirmDeleteLesson(lesson);
                                            }}
                                            title="Delete Lesson"
                                          >
                                            <Trash2 className="h-3.5 w-3.5" />
                                          </Button>
                                        </div>
                                      </div>

                                      {/* Expanded lesson children */}
                                      {isExpanded && (
                                        <div className="ml-12 space-y-1 py-1">
                                          {/* Lesson Content items */}
                                          {lessonContentItems.map((lc) => (
                                            <div
                                              key={lc.id}
                                              className="flex items-center gap-2 py-1.5 px-3 rounded-md hover:bg-accent/10 transition-colors group/content"
                                            >
                                              <List className="h-3 w-3 text-muted-foreground" />
                                              <span className="text-xs font-medium text-muted-foreground">
                                                #{lc.position}
                                              </span>
                                              <span className="text-sm text-foreground flex-1">
                                                {lc.name}
                                              </span>
                                              <span className="text-xs text-muted-foreground truncate max-w-[200px]">
                                                {lc.content.slice(0, 50)}...
                                              </span>
                                              <div className="flex gap-1 opacity-0 group-hover/content:opacity-100 transition-opacity">
                                                <Button
                                                  variant="ghost"
                                                  size="icon"
                                                  className="h-6 w-6"
                                                  onClick={() =>
                                                    openEditContent(lc)
                                                  }
                                                  title="Edit Content"
                                                >
                                                  <Pencil className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                  variant="ghost"
                                                  size="icon"
                                                  className="h-6 w-6 text-destructive hover:text-destructive"
                                                  onClick={() =>
                                                    confirmDeleteContent(lc)
                                                  }
                                                  title="Delete Content"
                                                >
                                                  <Trash2 className="h-3 w-3" />
                                                </Button>
                                              </div>
                                            </div>
                                          ))}

                                          {/* Quizzes */}
                                          {lessonQuizzes.map((q) => {
                                            const opts = quizOptions
                                              .filter((o) => o.quiz_id === q.id)
                                              .sort(
                                                (a, b) =>
                                                  a.position - b.position,
                                              );
                                            return (
                                              <div
                                                key={q.id}
                                                className="border border-border/50 rounded-lg p-3 space-y-2 bg-card/50"
                                              >
                                                <div className="flex items-start gap-2 group/quiz">
                                                  <HelpCircle className="h-3.5 w-3.5 text-amber-500 mt-0.5" />
                                                  <div className="flex-1">
                                                    <p className="text-sm font-medium text-foreground">
                                                      {q.question}
                                                    </p>
                                                    {q.explanation && (
                                                      <p className="text-xs text-muted-foreground mt-1">
                                                        {q.explanation}
                                                      </p>
                                                    )}
                                                  </div>
                                                  <div className="flex gap-1 opacity-0 group-hover/quiz:opacity-100 transition-opacity">
                                                    <Button
                                                      variant="ghost"
                                                      size="icon"
                                                      className="h-6 w-6"
                                                      onClick={() =>
                                                        openEditQuiz(q)
                                                      }
                                                      title="Edit Quiz"
                                                    >
                                                      <Pencil className="h-3 w-3" />
                                                    </Button>
                                                    <Button
                                                      variant="ghost"
                                                      size="icon"
                                                      className="h-6 w-6 text-destructive hover:text-destructive"
                                                      onClick={() =>
                                                        confirmDeleteQuiz(q)
                                                      }
                                                      title="Delete Quiz"
                                                    >
                                                      <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                  </div>
                                                </div>
                                                <div className="ml-5 space-y-1">
                                                  {opts.map((opt) => (
                                                    <div
                                                      key={opt.id}
                                                      className={`flex items-center gap-2 text-xs px-2 py-1 rounded ${opt.is_correct ? "bg-emerald-500/10 text-emerald-400" : "text-muted-foreground"}`}
                                                    >
                                                      <div
                                                        className={`w-2 h-2 rounded-full ${opt.is_correct ? "bg-emerald-500" : "bg-muted-foreground/30"}`}
                                                      />
                                                      {opt.text}
                                                    </div>
                                                  ))}
                                                </div>
                                              </div>
                                            );
                                          })}

                                          {lessonContentItems.length === 0 &&
                                            lessonQuizzes.length === 0 && (
                                              <p className="text-xs text-muted-foreground py-1 px-3">
                                                No content yet
                                              </p>
                                            )}
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              {lessons.filter((l) => l.chapter_id === ch.id)
                                .length === 0 && (
                                <p className="text-xs text-muted-foreground py-2 px-3">
                                  No lessons yet
                                </p>
                              )}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      ))}
                    {chapters.filter((ch) => ch.module_id === mod.id).length ===
                      0 && (
                      <p className="text-sm text-muted-foreground py-4 px-3">
                        No chapters yet. Click + to add one.
                      </p>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
        {modules.length === 0 && (
          <div className="glass-card rounded-xl p-12 text-center">
            <p className="text-muted-foreground">
              No modules yet. Start building your course structure.
            </p>
            <Button onClick={openCreateModule} className="mt-4 gap-2">
              <Plus className="h-4 w-4" /> Add First Module
            </Button>
          </div>
        )}
      </div>

      {/* ===== MODALS ===== */}

      {/* Module Modal */}
      <FormModal
        open={moduleModal}
        onOpenChange={setModuleModal}
        title={editingModule ? "Edit Module" : "Add Module"}
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Name</label>
            <Input
              value={moduleForm.name}
              onChange={(e) =>
                setModuleForm((f) => ({ ...f, name: e.target.value }))
              }
              placeholder="Module name"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">
              Description
            </label>
            <Textarea
              value={moduleForm.description}
              onChange={(e) =>
                setModuleForm((f) => ({ ...f, description: e.target.value }))
              }
              placeholder="Optional description"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">
              Status
            </label>
            <Select
              value={moduleForm.status}
              onValueChange={(v) => setModuleForm((f) => ({ ...f, status: v }))}
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
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setModuleModal(false)}>
              Cancel
            </Button>
            <Button onClick={saveModule}>
              {editingModule ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </FormModal>

      {/* Chapter Modal */}
      <FormModal
        open={chapterModal}
        onOpenChange={setChapterModal}
        title={editingChapter ? "Edit Chapter" : "Add Chapter"}
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Name</label>
            <Input
              value={chapterForm.name}
              onChange={(e) =>
                setChapterForm((f) => ({ ...f, name: e.target.value }))
              }
              placeholder="Chapter name"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">
              Description
            </label>
            <Textarea
              value={chapterForm.description}
              onChange={(e) =>
                setChapterForm((f) => ({ ...f, description: e.target.value }))
              }
              placeholder="Optional description"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">
              Status
            </label>
            <Select
              value={chapterForm.status}
              onValueChange={(v) =>
                setChapterForm((f) => ({ ...f, status: v }))
              }
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
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setChapterModal(false)}>
              Cancel
            </Button>
            <Button onClick={saveChapter}>
              {editingChapter ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </FormModal>

      {/* Lesson Modal */}
      <FormModal
        open={lessonModal}
        onOpenChange={setLessonModal}
        title={editingLesson ? "Edit Lesson" : "Add Lesson"}
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Name</label>
            <Input
              value={lessonForm.name}
              onChange={(e) =>
                setLessonForm((f) => ({ ...f, name: e.target.value }))
              }
              placeholder="Lesson name"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">
              Description
            </label>
            <Textarea
              value={lessonForm.description}
              onChange={(e) =>
                setLessonForm((f) => ({ ...f, description: e.target.value }))
              }
              placeholder="Optional description"
              className="mt-1"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">
                Type
              </label>
              <Select
                value={lessonForm.type}
                onValueChange={(v) => setLessonForm((f) => ({ ...f, type: v }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TEXT">Text</SelectItem>
                  <SelectItem value="QUIZ">Quiz</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">
                Status
              </label>
              <Select
                value={lessonForm.status}
                onValueChange={(v) =>
                  setLessonForm((f) => ({ ...f, status: v }))
                }
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
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground">
                XP Points
              </label>
              <Input
                type="number"
                value={lessonForm.xp_points}
                onChange={(e) =>
                  setLessonForm((f) => ({
                    ...f,
                    xp_points: parseInt(e.target.value) || 0,
                  }))
                }
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">
                Duration (min)
              </label>
              <Input
                type="number"
                value={lessonForm.duration_minutes}
                onChange={(e) =>
                  setLessonForm((f) => ({
                    ...f,
                    duration_minutes: parseInt(e.target.value) || 0,
                  }))
                }
                className="mt-1"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setLessonModal(false)}>
              Cancel
            </Button>
            <Button onClick={saveLesson}>
              {editingLesson ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </FormModal>

      {/* Lesson Content Modal */}
      <FormModal
        open={contentModal}
        onOpenChange={setContentModal}
        title={editingContent ? "Edit Lesson Content" : "Add Lesson Content"}
      >
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground">Title</label>
            <Input
              value={contentForm.name}
              onChange={(e) =>
                setContentForm((f) => ({ ...f, name: e.target.value }))
              }
              placeholder="Content title"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">
              Content
            </label>
            <Textarea
              value={contentForm.content}
              onChange={(e) =>
                setContentForm((f) => ({ ...f, content: e.target.value }))
              }
              placeholder="Write the lesson content..."
              className="mt-1 min-h-[150px]"
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setContentModal(false)}>
              Cancel
            </Button>
            <Button onClick={saveContent}>
              {editingContent ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </FormModal>

      {/* Quiz Modal */}
      <FormModal
        open={quizModal}
        onOpenChange={setQuizModal}
        title={editingQuiz ? "Edit Quiz" : "Add Quiz"}
      >
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          <div>
            <label className="text-sm font-medium text-foreground">
              Question
            </label>
            <Textarea
              value={quizForm.question}
              onChange={(e) =>
                setQuizForm((f) => ({ ...f, question: e.target.value }))
              }
              placeholder="Enter quiz question"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground">
              Explanation
            </label>
            <Textarea
              value={quizForm.explanation}
              onChange={(e) =>
                setQuizForm((f) => ({ ...f, explanation: e.target.value }))
              }
              placeholder="Optional explanation shown after answering"
              className="mt-1"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-foreground">
                Options
              </label>
              <Button
                variant="outline"
                size="sm"
                onClick={addOption}
                className="gap-1"
              >
                <Plus className="h-3 w-3" /> Add Option
              </Button>
            </div>
            <div className="space-y-2">
              {optionsForm.map((opt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input
                    value={opt.text}
                    onChange={(e) => {
                      setOptionsForm((f) =>
                        f.map((o, idx) =>
                          idx === i ? { ...o, text: e.target.value } : o,
                        ),
                      );
                    }}
                    placeholder={`Option ${i + 1}`}
                    className="flex-1"
                  />
                  <div className="flex items-center gap-1.5">
                    <label className="text-xs text-muted-foreground whitespace-nowrap">
                      Correct
                    </label>
                    <Switch
                      checked={opt.is_correct}
                      onCheckedChange={(v) => {
                        setOptionsForm((f) =>
                          f.map((o, idx) => ({
                            ...o,
                            is_correct: idx === i ? v : false,
                          })),
                        );
                      }}
                    />
                  </div>
                  {optionsForm.length > 2 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => removeOption(i)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setQuizModal(false)}>
              Cancel
            </Button>
            <Button onClick={saveQuiz}>
              {editingQuiz ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </FormModal>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteDialog}
        onOpenChange={(open) => !open && setDeleteDialog(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {deleteDialog?.type}?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteDialog?.name}"? This will
              also delete all nested items. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={executeDelete}
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
