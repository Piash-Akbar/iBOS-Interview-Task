export const ROLES = {
  EMPLOYER: "employer",
  CANDIDATE: "candidate",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

export const QUESTION_TYPES = {
  MCQ: "MCQ",
  CHECKBOX: "Checkbox",
  TEXT: "Text",
} as const;

export type QuestionType = (typeof QUESTION_TYPES)[keyof typeof QUESTION_TYPES];

export const ROUTES = {
  HOME: "/",
  EMPLOYER: {
    LOGIN: "/employer/login",
    DASHBOARD: "/dashboard",
    CREATE_EXAM: "/exams/create",
    VIEW_CANDIDATES: (examId: string) => `/exams/${examId}/candidates`,
  },
  CANDIDATE: {
    LOGIN: "/candidate/login",
    DASHBOARD: "/dashboard",
    EXAM: (examId: string) => `/exam/${examId}`,
    COMPLETED: (examId: string) => `/exam/${examId}/completed`,
  },
} as const;
