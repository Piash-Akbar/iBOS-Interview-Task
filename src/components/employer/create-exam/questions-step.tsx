"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useCreateExamStore } from "@/stores/create-exam-store";
import apiClient from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { QuestionCard } from "./question-card";
import { QuestionModal } from "./question-modal";
import type { DraftQuestion } from "@/stores/create-exam-store";

export function QuestionsStep() {
  const router = useRouter();
  const {
    basicInfo,
    questions,
    addQuestion,
    updateQuestion,
    removeQuestion,
    reset,
  } = useCreateExamStore();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<
    DraftQuestion | undefined
  >(undefined);

  const createExamMutation = useMutation({
    mutationFn: async () => {
      if (!basicInfo) throw new Error("Basic info is required");

      const payload = {
        title: basicInfo.title,
        totalCandidates: basicInfo.totalCandidates,
        totalSlots: basicInfo.totalSlots,
        totalQuestionSet: basicInfo.totalQuestionSet,
        questionType: basicInfo.questionType,
        startTime: basicInfo.startTime,
        endTime: basicInfo.endTime,
        duration: basicInfo.duration,
        negativeMarking: 0,
        questions: questions.map((q) => ({
          title: q.title,
          type: q.type,
          options: q.options,
          score: q.score,
        })),
      };

      const response = await apiClient.post("/exams", payload);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Online test created successfully!");
      reset();
      router.push("/dashboard");
    },
    onError: () => {
      toast.error("Failed to create online test. Please try again.");
    },
  });

  const handleOpenAdd = () => {
    setEditingQuestion(undefined);
    setModalOpen(true);
  };

  const handleEdit = (question: DraftQuestion) => {
    setEditingQuestion(question);
    setModalOpen(true);
  };

  const handleSave = (question: DraftQuestion, addMore: boolean) => {
    if (editingQuestion) {
      updateQuestion(question.id, question);
    } else {
      addQuestion(question);
    }

    if (!addMore) {
      setModalOpen(false);
      setEditingQuestion(undefined);
    } else {
      setEditingQuestion(undefined);
    }
  };

  const handleRemove = (id: string) => {
    removeQuestion(id);
  };

  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <QuestionCard
          key={question.id}
          question={question}
          index={index}
          onEdit={() => handleEdit(question)}
          onRemove={() => handleRemove(question.id)}
        />
      ))}

      <Button
        type="button"
        className="w-full"
        onClick={handleOpenAdd}
      >
        <Plus className="size-4 mr-1.5" />
        Add Question
      </Button>

      <div className="flex items-center justify-between pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard")}
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={() => createExamMutation.mutate()}
          disabled={questions.length === 0 || createExamMutation.isPending}
        >
          {createExamMutation.isPending ? "Creating..." : "Create Online Test"}
        </Button>
      </div>

      <QuestionModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingQuestion(undefined);
        }}
        editQuestion={editingQuestion}
        onSave={handleSave}
        questionNumber={
          editingQuestion
            ? questions.findIndex((q) => q.id === editingQuestion.id) + 1
            : questions.length + 1
        }
      />
    </div>
  );
}
