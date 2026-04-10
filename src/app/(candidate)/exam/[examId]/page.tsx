"use client";

import { useEffect, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { useExamStore } from "@/stores/exam-store";
import { useAuthStore } from "@/stores/auth-store";
import { useExamTimer } from "@/hooks/use-exam-timer";
import { useBehavioralTracking } from "@/hooks/use-behavioral-tracking";
import { useFullscreen } from "@/hooks/use-fullscreen";
import { ExamHeader } from "@/components/candidate/exam-screen/exam-header";
import { RadioQuestion } from "@/components/candidate/exam-screen/radio-question";
import { CheckboxQuestion } from "@/components/candidate/exam-screen/checkbox-question";
import { TextQuestion } from "@/components/candidate/exam-screen/text-question";
import { ExamActions } from "@/components/candidate/exam-screen/exam-actions";
import { TimeoutModal } from "@/components/candidate/exam-screen/timeout-modal";
import { toast } from "sonner";
import type { Exam } from "@/types";

export default function ExamPage() {
  const params = useParams<{ examId: string }>();
  const router = useRouter();
  const examId = params.examId;

  const user = useAuthStore((s) => s.user);
  const {
    answers,
    currentQuestionIndex,
    tabSwitches,
    fullscreenExits,
    isSubmitting,
    setAnswer,
    setCurrentQuestion,
    setIsSubmitting,
    reset,
  } = useExamStore();

  const { enterFullscreen, exitFullscreen } = useFullscreen();
  const hasInitialized = useRef(false);
  const hasTimedOut = useRef(false);
  const isSubmittingRef = useRef(false);

  const { data, isLoading, isError } = useQuery<{ exam: Exam }>({
    queryKey: ["exam", examId],
    queryFn: async () => {
      const response = await apiClient.get(`/exams/${examId}`);
      return response.data;
    },
    enabled: !!examId,
  });

  const exam = data?.exam;
  const questions = exam?.questions ?? [];
  const currentQuestion = questions[currentQuestionIndex];
  const isLast = currentQuestionIndex === questions.length - 1;

  const submitMutation = useMutation({
    mutationFn: async (payload: {
      answers: Record<string, string | string[]>;
      tabSwitches: number;
      fullscreenExits: number;
      autoSubmitted: boolean;
    }) => {
      const response = await apiClient.post(
        `/exams/${examId}/submit`,
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      exitFullscreen();
      reset();
      if (hasTimedOut.current) {
        // Timeout modal handles navigation
      } else {
        router.push(`/exam/${examId}/completed`);
      }
    },
    onError: (error: unknown) => {
      setIsSubmitting(false);
      isSubmittingRef.current = false;
      const message =
        error instanceof Error ? error.message : "Failed to submit exam";
      toast.error(message);
    },
  });

  const handleSubmit = useCallback(
    (autoSubmitted: boolean) => {
      if (isSubmittingRef.current) return;
      isSubmittingRef.current = true;
      setIsSubmitting(true);

      const currentAnswers = useExamStore.getState().answers;
      const currentTabSwitches = useExamStore.getState().tabSwitches;
      const currentFullscreenExits = useExamStore.getState().fullscreenExits;

      submitMutation.mutate({
        answers: currentAnswers,
        tabSwitches: currentTabSwitches,
        fullscreenExits: currentFullscreenExits,
        autoSubmitted,
      });
    },
    [submitMutation, setIsSubmitting]
  );

  const handleTimeout = useCallback(() => {
    hasTimedOut.current = true;
    handleSubmit(true);
  }, [handleSubmit]);

  const { formatted, isUrgent } = useExamTimer(
    exam?.duration ?? 0,
    handleTimeout
  );

  useBehavioralTracking();

  // Enter fullscreen on mount and reset store
  useEffect(() => {
    if (!hasInitialized.current && exam) {
      hasInitialized.current = true;
      reset();
      enterFullscreen();
    }
  }, [exam, reset, enterFullscreen]);

  const handleSaveAndContinue = () => {
    if (isLast) {
      handleSubmit(false);
    } else {
      setCurrentQuestion(currentQuestionIndex + 1);
    }
  };

  const handleSkip = () => {
    if (!isLast) {
      setCurrentQuestion(currentQuestionIndex + 1);
    }
  };

  const handleAnswer = (value: string | string[]) => {
    if (currentQuestion) {
      setAnswer(currentQuestion.id, value);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (isError || !exam || questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">
          Failed to load exam or no questions available.
        </p>
      </div>
    );
  }

  const currentAnswer = currentQuestion
    ? answers[currentQuestion.id]
    : undefined;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-6 space-y-6">
      <ExamHeader
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        timeFormatted={formatted}
        isUrgent={isUrgent}
      />

      {currentQuestion?.type === "MCQ" && (
        <RadioQuestion
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          selectedAnswer={
            typeof currentAnswer === "string" ? currentAnswer : undefined
          }
          onAnswer={(val) => handleAnswer(val)}
        />
      )}

      {currentQuestion?.type === "Checkbox" && (
        <CheckboxQuestion
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          selectedAnswers={
            Array.isArray(currentAnswer) ? currentAnswer : []
          }
          onAnswer={(vals) => handleAnswer(vals)}
        />
      )}

      {currentQuestion?.type === "Text" && (
        <TextQuestion
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          answer={typeof currentAnswer === "string" ? currentAnswer : ""}
          onAnswer={(val) => handleAnswer(val)}
        />
      )}

      <ExamActions
        onSkip={handleSkip}
        onSaveAndContinue={handleSaveAndContinue}
        isLast={isLast}
        isSubmitting={isSubmitting}
      />

      <TimeoutModal
        open={hasTimedOut.current && !submitMutation.isPending}
        userName={user?.name ?? "Candidate"}
      />
    </div>
  );
}
