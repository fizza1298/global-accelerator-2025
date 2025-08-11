import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "skillbridge.progress.v1";
const ProgressContext = createContext(null);

// progress shape: { [lessonId]: { total: number, completed: number[] } }
export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setProgress(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); } catch {}
  }, [progress]);

  const completeStep = (lessonId, stepIndex, totalSteps) => {
    setProgress(prev => {
      const entry = prev[lessonId] ?? { total: totalSteps, completed: [] };
      const total = Math.max(entry.total, totalSteps);
      const completed = Array.from(new Set([...entry.completed, stepIndex])).sort((a,b)=>a-b);
      return { ...prev, [lessonId]: { total, completed } };
    });
  };

  const resetLesson = (lessonId) =>
    setProgress(prev => ({ ...prev, [lessonId]: { total: prev[lessonId]?.total ?? 0, completed: [] }}));

  const percentFor = (lessonId) => {
    const e = progress[lessonId];
    if (!e || !e.total) return 0;
    const done = e.completed.filter(i => i < e.total).length;
    return Math.round((done / e.total) * 100);
    };

  const value = useMemo(() => ({ progress, completeStep, resetLesson, percentFor }), [progress]);
  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export const useProgress = () => {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
};
