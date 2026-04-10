"use client";

import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

interface TestCompletedProps {
  userName: string;
  examTitle: string;
}

export function TestCompleted({ userName, examTitle }: TestCompletedProps) {
  const router = useRouter();

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-12">
      <Card className="bg-white w-full max-w-lg">
        <CardContent className="flex flex-col items-center gap-6 py-10">
          <CheckCircle2 className="size-16 text-blue-500" />
          <h1 className="text-xl font-bold text-foreground">Test Completed</h1>
          <p className="text-sm text-muted-foreground text-center max-w-sm">
            Congratulations! {userName}, You have completed your {examTitle}.
            Thank you for participating.
          </p>
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Back to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
