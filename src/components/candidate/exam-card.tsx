"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, FileText, XCircle } from "lucide-react";
import type { Exam } from "@/types";

interface ExamCardProps {
  exam: Exam;
}

export function ExamCard({ exam }: ExamCardProps) {
  const negativeMarkingText =
    exam.negativeMarking && exam.negativeMarking !== 0
      ? `${exam.negativeMarking}/wrong`
      : "None";

  return (
    <Card className="bg-white">
      <CardContent className="flex flex-col gap-4">
        <h3 className="text-base font-semibold text-foreground">
          {exam.title}
        </h3>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="size-4" />
            <span>Duration: {exam.duration} min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FileText className="size-4" />
            <span>Question: {exam._count?.questions ?? exam.totalQuestionSet}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <XCircle className="size-4" />
            <span>Negative Marking: {negativeMarkingText}</span>
          </div>
        </div>
        <div>
          <Link href={`/exam/${exam.id}`}>
            <Button variant="outline" size="sm">
              Start
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
