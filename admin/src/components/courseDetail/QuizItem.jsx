import { HelpCircle, Pencil, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

export function QuizItem({ quiz, options, onEdit, onDelete }) {
  return (
    <div className="border border-border/50 rounded-lg p-3 space-y-2 bg-card/50">
      <div className="flex items-start gap-2 group/quiz">
        <HelpCircle className="h-3.5 w-3.5 text-amber-500 mt-0.5" />
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">{quiz.question}</p>
          {quiz.explanation && (
            <p className="text-xs text-muted-foreground mt-1">
              {quiz.explanation}
            </p>
          )}
        </div>
        <div className="flex gap-1 opacity-0 group-hover/quiz:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => onEdit(quiz)}
            title="Edit Quiz"
          >
            <Pencil className="h-3 w-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-destructive hover:text-destructive"
            onClick={() => onDelete(quiz)}
            title="Delete Quiz"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="ml-5 space-y-1">
        {options.map((opt) => (
          <div
            key={opt.id}
            className={`flex items-center gap-2 text-xs px-2 py-1 rounded ${
              opt.is_correct
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'text-muted-foreground'
            }`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                opt.is_correct ? 'bg-emerald-500' : 'bg-muted-foreground/30'
              }`}
            />
            {opt.text}
          </div>
        ))}
      </div>
    </div>
  );
}
