import { Plus, Trash2 } from 'lucide-react';
import { FormModal } from '../FormModal';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Switch } from '../ui/switch';
import { Textarea } from '../ui/textarea';

export function QuizModal({
  open,
  onOpenChange,
  quizForm,
  onQuizChange,
  optionsForm,
  onOptionChange,
  onAddOption,
  onRemoveOption,
  onSave,
  isEditing,
}) {
  return (
    <FormModal
      open={open}
      onOpenChange={onOpenChange}
      title={isEditing ? 'Edit Quiz' : 'Add Quiz'}
    >
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
        <div>
          <label className="text-sm font-medium text-foreground">
            Question
          </label>
          <Textarea
            value={quizForm.question}
            onChange={(e) => onQuizChange('question', e.target.value)}
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
            onChange={(e) => onQuizChange('explanation', e.target.value)}
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
              onClick={onAddOption}
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
                  onChange={(e) => onOptionChange(i, 'text', e.target.value)}
                  placeholder={`Option ${i + 1}`}
                  className="flex-1"
                />
                <div className="flex items-center gap-1.5">
                  <label className="text-xs text-muted-foreground whitespace-nowrap">
                    Correct
                  </label>
                  <Switch
                    checked={opt.is_correct}
                    onCheckedChange={(v) => onOptionChange(i, 'is_correct', v)}
                  />
                </div>
                {optionsForm.length > 2 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => onRemoveOption(i)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSave}>{isEditing ? 'Update' : 'Create'}</Button>
        </div>
      </div>
    </FormModal>
  );
}
