"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ExamHeaderProps {
  currentQuestion: number;
  totalQuestions: number;
  timeFormatted: string;
  isUrgent: boolean;
}

export function ExamHeader({
  currentQuestion,
  totalQuestions,
  timeFormatted,
  isUrgent,
}: ExamHeaderProps) {
  return (
    <Card className="bg-white">
      <CardContent className="flex items-center justify-between py-4">
        <p className="text-sm font-medium text-foreground">
          Question ({currentQuestion}/{totalQuestions})
        </p>
        <Badge
          variant="outline"
          className={cn(
            "text-sm px-3 py-1",
            isUrgent && "border-destructive text-destructive"
          )}
        >
          {timeFormatted} left
        </Badge>
      </CardContent>
    </Card>
  );
}
