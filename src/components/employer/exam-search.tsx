"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ExamSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function ExamSearch({ value, onChange }: ExamSearchProps) {
  return (
    <div className="relative w-full max-w-sm">
      <Input
        placeholder="Search by exam title"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pr-9"
      />
      <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
    </div>
  );
}
