"use client";

import { Button } from "@/components/ui/button";

interface ExamActionsProps {
  onSkip: () => void;
  onSaveAndContinue: () => void;
  isLast: boolean;
  isSubmitting: boolean;
}

export function ExamActions({
  onSkip,
  onSaveAndContinue,
  isLast,
  isSubmitting,
}: ExamActionsProps) {
  return (
    <div className="flex items-center justify-between">
      <Button variant="outline" onClick={onSkip} disabled={isSubmitting}>
        Skip this Question
      </Button>
      <Button onClick={onSaveAndContinue} disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : isLast ? "Submit" : "Save & Continue"}
      </Button>
    </div>
  );
}
