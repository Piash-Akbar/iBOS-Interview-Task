import { z } from "zod";

export const questionOptionSchema = z.object({
  label: z.string(),
  text: z.string().min(1, "Option text is required"),
  isCorrect: z.boolean(),
});

export const questionSchema = z.object({
  title: z.string().min(1, "Question title is required"),
  type: z.enum(["MCQ", "Checkbox", "Text"]),
  options: z.array(questionOptionSchema),
  score: z.coerce.number().int().min(1, "Score must be at least 1"),
});

export type QuestionFormData = z.infer<typeof questionSchema>;
