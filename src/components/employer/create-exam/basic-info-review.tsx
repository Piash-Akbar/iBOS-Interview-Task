"use client";

import { useRouter } from "next/navigation";
import { useCreateExamStore } from "@/stores/create-exam-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import type { BasicInfoData } from "@/stores/create-exam-store";

interface BasicInfoReviewProps {
  data: BasicInfoData;
  onEdit: () => void;
}

function formatDateTime(value: string): string {
  if (!value) return "N/A";
  const date = new Date(value);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function BasicInfoReview({ data, onEdit }: BasicInfoReviewProps) {
  const router = useRouter();
  const { setStep } = useCreateExamStore();

  const fields = [
    { label: "Online Test Title", value: data.title },
    {
      label: "Total Candidates",
      value: data.totalCandidates.toLocaleString(),
    },
    { label: "Total Slots", value: String(data.totalSlots) },
    { label: "Total Question Set", value: String(data.totalQuestionSet) },
    { label: "Question Type", value: data.questionType },
    { label: "Start Time", value: formatDateTime(data.startTime) },
    { label: "End Time", value: formatDateTime(data.endTime) },
    { label: "Duration", value: `${data.duration} minutes` },
  ];

  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Basic Information</CardTitle>
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-1.5 text-sm text-primary hover:underline"
        >
          <Pencil className="size-3.5" />
          Edit
        </button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          {fields.map((field) => (
            <div key={field.label} className="space-y-1">
              <p className="text-xs text-muted-foreground">{field.label}</p>
              <p className="text-sm font-medium text-foreground">
                {field.value}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-6 mt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/dashboard")}
          >
            Cancel
          </Button>
          <Button type="button" onClick={() => setStep(2)}>
            Save &amp; Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
