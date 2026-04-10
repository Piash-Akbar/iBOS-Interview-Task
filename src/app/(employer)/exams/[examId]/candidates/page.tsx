"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/shared/empty-state";
import type { ExamSubmission } from "@/types";

interface CandidatesResponse {
  submissions: ExamSubmission[];
}

export default function ViewCandidatesPage() {
  const params = useParams<{ examId: string }>();
  const examId = params.examId;

  const { data, isLoading } = useQuery<CandidatesResponse>({
    queryKey: ["exam-candidates", examId],
    queryFn: async () => {
      const response = await apiClient.get(`/exams/${examId}/candidates`);
      return response.data;
    },
    enabled: !!examId,
  });

  const submissions = data?.submissions ?? [];

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-foreground">Candidates</h1>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : submissions.length === 0 ? (
        <EmptyState
          title="No Submissions Yet"
          description="No candidates have submitted this exam yet."
        />
      ) : (
        <div className="rounded-lg border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Score</TableHead>
                <TableHead className="text-right">Tab Switches</TableHead>
                <TableHead className="text-right">Fullscreen Exits</TableHead>
                <TableHead>Auto-Submitted</TableHead>
                <TableHead>Submitted At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium">
                    {submission.user?.name ?? "Unknown"}
                  </TableCell>
                  <TableCell>{submission.user?.email ?? "-"}</TableCell>
                  <TableCell className="text-right">
                    {submission.score ?? "-"}
                  </TableCell>
                  <TableCell className="text-right">
                    {submission.tabSwitches}
                  </TableCell>
                  <TableCell className="text-right">
                    {submission.fullscreenExits}
                  </TableCell>
                  <TableCell>
                    {submission.autoSubmitted ? (
                      <Badge variant="destructive">Yes</Badge>
                    ) : (
                      <Badge variant="secondary">No</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(submission.submittedAt).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
