"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { Question } from "@/types";

interface CheckboxQuestionProps {
  question: Question;
  questionNumber: number;
  selectedAnswers: string[];
  onAnswer: (values: string[]) => void;
}

export function CheckboxQuestion({
  question,
  questionNumber,
  selectedAnswers,
  onAnswer,
}: CheckboxQuestionProps) {
  const handleToggle = (label: string) => {
    if (selectedAnswers.includes(label)) {
      onAnswer(selectedAnswers.filter((a) => a !== label));
    } else {
      onAnswer([...selectedAnswers, label]);
    }
  };

  return (
    <Card className="bg-white">
      <CardContent className="flex flex-col gap-5 py-6">
        <h2 className="text-base font-semibold text-foreground">
          Q{questionNumber}. {question.title}
        </h2>
        <div className="flex flex-col gap-3">
          {question.options.map((option) => {
            const isChecked = selectedAnswers.includes(option.label);
            return (
              <label
                key={option.label}
                className={cn(
                  "flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors",
                  isChecked
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-muted-foreground/30"
                )}
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => handleToggle(option.label)}
                />
                <span className="text-sm text-foreground">{option.text}</span>
              </label>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
