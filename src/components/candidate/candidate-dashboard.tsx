"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { ExamCard } from "@/components/candidate/exam-card";
import { ExamSearch } from "@/components/employer/exam-search";
import { EmptyState } from "@/components/shared/empty-state";
import { Pagination } from "@/components/shared/pagination";
import type { Exam } from "@/types";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

interface ExamsResponse {
  exams: Exam[];
  total: number;
  page: number;
  totalPages: number;
}

export function CandidateDashboard() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading } = useQuery<ExamsResponse>({
    queryKey: ["exams", debouncedSearch, page, limit],
    queryFn: async () => {
      const response = await apiClient.get("/exams", {
        params: { search: debouncedSearch, page, limit },
      });
      return response.data;
    },
  });

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, limit]);

  const exams = data?.exams ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-xl font-semibold text-foreground shrink-0">
          Online Tests
        </h1>
        <ExamSearch value={search} onChange={setSearch} />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : exams.length === 0 ? (
        <EmptyState
          title="No Online Test Available"
          description="There are no online tests available at the moment. Please check back later."
        />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exams.map((exam) => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
          </div>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            limit={limit}
            onLimitChange={setLimit}
          />
        </>
      )}
    </div>
  );
}
