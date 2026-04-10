"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import type { Question } from "@/types";

interface TextQuestionProps {
  question: Question;
  questionNumber: number;
  answer: string;
  onAnswer: (value: string) => void;
}

export function TextQuestion({
  question,
  questionNumber,
  answer,
  onAnswer,
}: TextQuestionProps) {
  return (
    <Card className="bg-white">
      <CardContent className="flex flex-col gap-5 py-6">
        <h2 className="text-base font-semibold text-foreground">
          Q{questionNumber}. {question.title}
        </h2>
        <Textarea
          placeholder="Type your answer here..."
          value={answer}
          onChange={(e) => onAnswer(e.target.value)}
          rows={6}
          className="resize-none"
        />
      </CardContent>
    </Card>
  );
}
