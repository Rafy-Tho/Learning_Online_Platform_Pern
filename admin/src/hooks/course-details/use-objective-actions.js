import { useState } from 'react';
import { useCreateObjective } from '../objectives/use-create-objective';
import { useDeleteObjective } from '../objectives/use-delete-objective';
import { useUpdateObjective } from '../objectives/use-update-objective';
import { toast } from '../use-toast';

export function useObjectiveActions({ objectives, setObjectives }) {
  const [editingIdx, setEditingIdx] = useState(null);
  const [draft, setDraft] = useState('');
  const [adding, setAdding] = useState(false);
  const [newText, setNewText] = useState('');

  const { updateObjective, isUpdating } = useUpdateObjective();
  const { deleteObjective } = useDeleteObjective();
  const { createObjective, isCreating } = useCreateObjective();

  const startEdit = (i, content) => {
    setEditingIdx(i);
    setDraft(content);
  };

  const cancelEdit = () => setEditingIdx(null);

  const saveEdit = async (i) => {
    if (!draft.trim()) return;
    const obj = objectives[i];
    try {
      await updateObjective({
        objectiveId: obj.id,
        objectiveData: { ...obj, content: draft.trim() },
      });
      toast({ title: 'Success', description: 'Objective updated' });
      setObjectives((os) =>
        os.map((o, idx) => (idx === i ? { ...o, content: draft.trim() } : o)),
      );
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to update objective',
        variant: 'destructive',
      });
    } finally {
      setEditingIdx(null);
    }
  };

  const editKeyDown = (e, i) => {
    if (e.key === 'Enter') saveEdit(i);
    else if (e.key === 'Escape') cancelEdit();
  };

  const startAdd = () => {
    setAdding(true);
    setNewText('');
  };
  const cancelAdd = () => setAdding(false);

  const confirmAdd = async () => {
    if (!newText.trim()) return;
    const lastPosition =
      objectives.length > 0 ? objectives[objectives.length - 1].position : 1;
    try {
      const res = await createObjective({
        objectiveData: {
          position: lastPosition + 1,
          content: newText.trim(),
        },
      });
      toast({ title: 'Success', description: 'Objective created' });
      setObjectives((os) => [...os, res?.data]);
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to create objective',
        variant: 'destructive',
      });
    } finally {
      setNewText('');
      setAdding(false);
    }
  };

  const addKeyDown = (e) => {
    if (e.key === 'Enter') confirmAdd();
    else if (e.key === 'Escape') cancelAdd();
  };

  const remove = async (id) => {
    try {
      await deleteObjective(id);
      toast({ title: 'Success', description: 'Objective deleted' });
      setObjectives((os) => os.filter((o) => o.id !== id));
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message || 'Failed to delete objective',
        variant: 'destructive',
      });
    }
  };

  return {
    editingIdx,
    draft,
    setDraft,
    isUpdating,
    adding,
    newText,
    setNewText,
    isCreating,
    startEdit,
    cancelEdit,
    saveEdit,
    editKeyDown,
    startAdd,
    cancelAdd,
    confirmAdd,
    addKeyDown,
    remove,
  };
}
