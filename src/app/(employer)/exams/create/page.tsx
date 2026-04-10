"use client";

import Link from "next/link";
import { useCreateExamStore } from "@/stores/create-exam-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StepIndicator } from "@/components/employer/create-exam/step-indicator";
import { BasicInfoForm } from "@/components/employer/create-exam/basic-info-form";
import { BasicInfoReview } from "@/components/employer/create-exam/basic-info-review";
import { QuestionsStep } from "@/components/employer/create-exam/questions-step";

export default function CreateExamPage() {
  const { currentStep, basicInfo, isReviewing, setIsReviewing } =
    useCreateExamStore();

  const completedSteps: number[] = [];
  if (basicInfo && isReviewing) completedSteps.push(1);
  if (currentStep === 2) completedSteps.push(1);

  return (
    <div className="space-y-6">
      <Card className="bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Manage Online Test</CardTitle>
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              Back to Dashboard
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <StepIndicator
            currentStep={currentStep}
            completedSteps={completedSteps}
          />
        </CardContent>
      </Card>

      {currentStep === 1 && (
        <>
          {isReviewing && basicInfo ? (
            <BasicInfoReview
              data={basicInfo}
              onEdit={() => setIsReviewing(false)}
            />
          ) : (
            <BasicInfoForm />
          )}
        </>
      )}

      {currentStep === 2 && <QuestionsStep />}
    </div>
  );
}
