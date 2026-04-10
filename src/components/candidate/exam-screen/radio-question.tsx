"use client";

import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import type { Question } from "@/types";

interface RadioQuestionProps {
  question: Question;
  questionNumber: number;
  selectedAnswer: string | undefined;
  onAnswer: (value: string) => void;
}

export function RadioQuestion({
  question,
  questionNumber,
  selectedAnswer,
  onAnswer,
}: RadioQuestionProps) {
  return (
    <Card className="bg-white">
      <CardContent className="flex flex-col gap-5 py-6">
        <h2 className="text-base font-semibold text-foreground">
          Q{questionNumber}. {question.title}
        </h2>
        <RadioGroup
          value={selectedAnswer ?? ""}
          onValueChange={(val: string | null) => {
            if (val) onAnswer(val);
          }}
          className="flex flex-col gap-3"
        >
          {question.options.map((option) => (
            <label
              key={option.label}
              className={cn(
                "flex items-center gap-3 rounded-lg border px-4 py-3 cursor-pointer transition-colors",
                selectedAnswer === option.label
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground/30"
              )}
            >
              <RadioGroupItem value={option.label} />
              <span className="text-sm text-foreground">{option.text}</span>
            </label>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
