"use client";

import { Check } from "lucide-react";

interface StepIndicatorProps {
  currentStep: number;
  completedSteps: number[];
}

export function StepIndicator({
  currentStep,
  completedSteps,
}: StepIndicatorProps) {
  const steps = [
    { number: 1, label: "Basic Info" },
    { number: 2, label: "Questions Sets" },
  ];

  return (
    <div className="flex items-center justify-center gap-0">
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(step.number);
        const isActive = currentStep === step.number;

        return (
          <div key={step.number} className="flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  isCompleted
                    ? "bg-primary text-primary-foreground"
                    : isActive
                      ? "bg-primary text-primary-foreground"
                      : "border-2 border-muted-foreground/30 text-muted-foreground"
                }`}
              >
                {isCompleted ? <Check className="size-4" /> : step.number}
              </div>
              <span
                className={`text-sm font-medium whitespace-nowrap ${
                  isActive || isCompleted
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-24 h-px mx-4 ${
                  completedSteps.includes(step.number)
                    ? "bg-primary"
                    : "bg-muted-foreground/30"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
