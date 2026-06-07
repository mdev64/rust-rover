import { useState, useEffect } from 'react';

const STORAGE_KEY = 'rust-rover-progress';

function useProgress() {
  const [completed, setCompleted] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(completed));
    } catch {
      // localStorage might be unavailable (e.g. private browsing)
    }
  }, [completed]);

  function markComplete(lessonId) {
    setCompleted((prev) => {
      if (prev.includes(lessonId)) return prev;
      return [...prev, lessonId];
    });
  }

  function isComplete(lessonId) {
    return completed.includes(lessonId);
  }

  function resetProgress() {
    setCompleted([]);
  }

  return { completed, markComplete, isComplete, resetProgress };
}

export default useProgress;
