"use client";

import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import type { DraftQuestion } from "@/stores/create-exam-store";

interface QuestionCardProps {
  question: DraftQuestion;
  index: number;
  onEdit: () => void;
  onRemove: () => void;
}

export function QuestionCard({
  question,
  index,
  onEdit,
  onRemove,
}: QuestionCardProps) {
  return (
    <div className="rounded-xl border bg-white p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h4 className="text-sm font-semibold text-foreground">
            Question {index + 1}
          </h4>
          <Badge variant="secondary">{question.type}</Badge>
          <Badge variant="outline">{question.score} pt</Badge>
        </div>
      </div>

      <p className="text-sm text-foreground font-medium">{question.title}</p>

      {question.options.length > 0 && (
        <div className="space-y-2">
          {question.options.map((option) => (
            <div
              key={option.label}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                option.isCorrect
                  ? "bg-green-50 text-green-800 dark:bg-green-950/30 dark:text-green-300"
                  : "bg-muted/50 text-foreground"
              }`}
            >
              {option.isCorrect && <Check className="size-4 text-green-600" />}
              <span>
                {option.label}. {option.text}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 pt-2">
        <button
          type="button"
          onClick={onEdit}
          className="text-sm text-primary hover:underline font-medium"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="text-sm text-destructive hover:underline font-medium"
        >
          Remove From Exam
        </button>
      </div>
    </div>
  );
}
