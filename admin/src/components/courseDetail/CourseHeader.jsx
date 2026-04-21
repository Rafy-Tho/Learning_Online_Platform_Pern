import { ArrowLeft, Plus } from 'lucide-react';
import { StatusBadge } from '../StatusBadge';
import { Button } from '../ui/button';

export function CourseHeader({ course, onBack, onAddModule }) {
  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon" onClick={onBack}>
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
      <Button onClick={onAddModule} className="gap-2">
        <Plus className="h-4 w-4" /> Add Module
      </Button>
    </div>
  );
}
