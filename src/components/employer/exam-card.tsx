"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, FileText, Clock } from "lucide-react";
import type { Exam } from "@/types";

interface ExamCardProps {
  exam: Exam;
}

export function ExamCard({ exam }: ExamCardProps) {
  return (
    <Card className="bg-white">
      <CardContent className="flex flex-col gap-4">
        <h3 className="text-base font-semibold text-foreground">
          {exam.title}
        </h3>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Users className="size-4" />
            <span>Candidates: {exam.totalCandidates.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <FileText className="size-4" />
            <span>Question Set: {exam.totalQuestionSet}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="size-4" />
            <span>Exam Slots: {exam.totalSlots}</span>
          </div>
        </div>
        <div>
          <Link href={`/exams/${exam.id}/candidates`}>
            <Button variant="outline" size="sm">
              View Candidates
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
