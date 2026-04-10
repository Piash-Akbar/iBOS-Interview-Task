"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useCreateExamStore } from "@/stores/create-exam-store";
import {
  basicInfoSchema,
  type BasicInfoFormData,
} from "@/schemas/exam.schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function BasicInfoForm() {
  const router = useRouter();
  const { basicInfo, setBasicInfo, setIsReviewing } = useCreateExamStore();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: basicInfo
      ? {
          title: basicInfo.title,
          totalCandidates: basicInfo.totalCandidates,
          totalSlots: basicInfo.totalSlots,
          totalQuestionSet: basicInfo.totalQuestionSet,
          questionType: basicInfo.questionType,
          startTime: basicInfo.startTime,
          endTime: basicInfo.endTime,
          duration: basicInfo.duration,
        }
      : {
          title: "",
          totalCandidates: "" as unknown as number,
          totalSlots: "" as unknown as number,
          totalQuestionSet: "" as unknown as number,
          questionType: "",
          startTime: "",
          endTime: "",
          duration: "" as unknown as number,
        },
  });

  const totalSlots = watch("totalSlots");
  const totalQuestionSet = watch("totalQuestionSet");
  const questionType = watch("questionType");

  const onSubmit = (data: Record<string, unknown>) => {
    setBasicInfo(data as unknown as BasicInfoFormData);
    setIsReviewing(true);
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-lg">Basic Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Online Test Title *</Label>
            <Input
              id="title"
              placeholder="Enter online test title"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-xs text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalCandidates">Total Candidates *</Label>
              <Input
                id="totalCandidates"
                type="number"
                placeholder="Enter total candidates"
                {...register("totalCandidates")}
              />
              {errors.totalCandidates && (
                <p className="text-xs text-destructive">
                  {errors.totalCandidates.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Total Slots *</Label>
              <Select
                value={totalSlots ? String(totalSlots) : undefined}
                onValueChange={(val: string | null) =>
                  val && setValue("totalSlots", Number(val), { shouldValidate: true })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select slots" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.totalSlots && (
                <p className="text-xs text-destructive">
                  {errors.totalSlots.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Total Question Set *</Label>
              <Select
                value={
                  totalQuestionSet ? String(totalQuestionSet) : undefined
                }
                onValueChange={(val: string | null) =>
                  val && setValue("totalQuestionSet", Number(val), {
                    shouldValidate: true,
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select question set" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.totalQuestionSet && (
                <p className="text-xs text-destructive">
                  {errors.totalQuestionSet.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Question Type *</Label>
              <Select
                value={questionType || undefined}
                onValueChange={(val: string | null) =>
                  val && setValue("questionType", val, { shouldValidate: true })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select question type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MCQ">MCQ</SelectItem>
                  <SelectItem value="Checkbox">Checkbox</SelectItem>
                  <SelectItem value="Text">Text</SelectItem>
                  <SelectItem value="Mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
              {errors.questionType && (
                <p className="text-xs text-destructive">
                  {errors.questionType.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time *</Label>
              <Input
                id="startTime"
                type="datetime-local"
                {...register("startTime")}
              />
              {errors.startTime && (
                <p className="text-xs text-destructive">
                  {errors.startTime.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endTime">End Time *</Label>
              <Input
                id="endTime"
                type="datetime-local"
                {...register("endTime")}
              />
              {errors.endTime && (
                <p className="text-xs text-destructive">
                  {errors.endTime.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                placeholder="e.g. 60"
                {...register("duration")}
              />
              {errors.duration && (
                <p className="text-xs text-destructive">
                  {errors.duration.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/dashboard")}
            >
              Cancel
            </Button>
            <Button type="submit">Save &amp; Continue</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
