"use client";

import { create } from "zustand";
import type { QuestionOption } from "@/types";

export interface BasicInfoData {
  title: string;
  totalCandidates: number;
  totalSlots: number;
  totalQuestionSet: number;
  questionType: string;
  startTime: string;
  endTime: string;
  duration: number;
}

export interface DraftQuestion {
  id: string;
  title: string;
  type: string;
  options: QuestionOption[];
  score: number;
  order: number;
}

interface CreateExamState {
  currentStep: number;
  basicInfo: BasicInfoData | null;
  questions: DraftQuestion[];
  isReviewing: boolean;
  setStep: (step: number) => void;
  setBasicInfo: (data: BasicInfoData) => void;
  setIsReviewing: (val: boolean) => void;
  addQuestion: (question: DraftQuestion) => void;
  updateQuestion: (id: string, question: Partial<DraftQuestion>) => void;
  removeQuestion: (id: string) => void;
  reset: () => void;
}

export const useCreateExamStore = create<CreateExamState>((set) => ({
  currentStep: 1,
  basicInfo: null,
  questions: [],
  isReviewing: false,
  setStep: (step) => set({ currentStep: step }),
  setBasicInfo: (data) => set({ basicInfo: data }),
  setIsReviewing: (val) => set({ isReviewing: val }),
  addQuestion: (question) =>
    set((state) => ({ questions: [...state.questions, question] })),
  updateQuestion: (id, updates) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === id ? { ...q, ...updates } : q
      ),
    })),
  removeQuestion: (id) =>
    set((state) => ({
      questions: state.questions.filter((q) => q.id !== id),
    })),
  reset: () =>
    set({
      currentStep: 1,
      basicInfo: null,
      questions: [],
      isReviewing: false,
    }),
}));
