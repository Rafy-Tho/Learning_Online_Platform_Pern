import { useState } from 'react';

const makeToggle = (setter) => (id) =>
  setter((prev) => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

export function useExpandCollapse() {
  const [expandedModules, setExpandedModules] = useState(new Set());
  const [expandedChapters, setExpandedChapters] = useState(new Set());
  const [expandedLessons, setExpandedLessons] = useState(new Set());

  return {
    expandedModules,
    expandedChapters,
    expandedLessons,
    toggleModule: makeToggle(setExpandedModules),
    toggleChapter: makeToggle(setExpandedChapters),
    toggleLesson: makeToggle(setExpandedLessons),
  };
}
