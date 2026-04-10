import { z } from "zod";

export const basicInfoSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  totalCandidates: z.coerce.number().int().positive("Must be a positive number"),
  totalSlots: z.coerce.number().int().positive("Must be a positive number"),
  totalQuestionSet: z.coerce.number().int().min(1, "At least 1 question set"),
  questionType: z.string().min(1, "Question type is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  duration: z.coerce.number().int().min(1, "Duration must be at least 1 minute"),
});

export type BasicInfoFormData = z.infer<typeof basicInfoSchema>;
