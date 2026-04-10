"use client";

import { create } from "zustand";

interface ExamState {
  answers: Record<string, string | string[]>;
  currentQuestionIndex: number;
  tabSwitches: number;
  fullscreenExits: number;
  isSubmitting: boolean;
  setAnswer: (questionId: string, answer: string | string[]) => void;
  setCurrentQuestion: (index: number) => void;
  incrementTabSwitch: () => void;
  incrementFullscreenExit: () => void;
  setIsSubmitting: (val: boolean) => void;
  reset: () => void;
}

export const useExamStore = create<ExamState>((set) => ({
  answers: {},
  currentQuestionIndex: 0,
  tabSwitches: 0,
  fullscreenExits: 0,
  isSubmitting: false,
  setAnswer: (questionId, answer) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer },
    })),
  setCurrentQuestion: (index) => set({ currentQuestionIndex: index }),
  incrementTabSwitch: () =>
    set((state) => ({ tabSwitches: state.tabSwitches + 1 })),
  incrementFullscreenExit: () =>
    set((state) => ({ fullscreenExits: state.fullscreenExits + 1 })),
  setIsSubmitting: (val) => set({ isSubmitting: val }),
  reset: () =>
    set({
      answers: {},
      currentQuestionIndex: 0,
      tabSwitches: 0,
      fullscreenExits: 0,
      isSubmitting: false,
    }),
}));
