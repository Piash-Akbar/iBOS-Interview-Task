"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { useAuthStore } from "@/stores/auth-store";
import { TestCompleted } from "@/components/candidate/test-completed";
import type { Exam } from "@/types";

export default function ExamCompletedPage() {
  const params = useParams<{ examId: string }>();
  const examId = params.examId;
  const user = useAuthStore((s) => s.user);

  const { data, isLoading } = useQuery<{ exam: Exam }>({
    queryKey: ["exam", examId],
    queryFn: async () => {
      const response = await apiClient.get(`/exams/${examId}`);
      return response.data;
    },
    enabled: !!examId,
  });

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <TestCompleted
      userName={user?.name ?? "Candidate"}
      examTitle={data?.exam?.title ?? "Online Test"}
    />
  );
}
