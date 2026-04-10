export interface User {
  id: string;
  email: string;
  name: string;
  refId: string;
  role: string;
}

export interface Exam {
  id: string;
  title: string;
  totalCandidates: number;
  totalSlots: number;
  totalQuestionSet: number;
  questionType: string;
  startTime: string;
  endTime: string;
  duration: number;
  negativeMarking: number;
  createdAt: string;
  creatorId: string;
  questions?: Question[];
  _count?: {
    questions: number;
    submissions: number;
  };
}

export interface QuestionOption {
  label: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  title: string;
  type: string;
  options: QuestionOption[];
  score: number;
  order: number;
  examId: string;
}

export interface ExamSubmission {
  id: string;
  userId: string;
  examId: string;
  answers: Record<string, string | string[]>;
  score: number | null;
  tabSwitches: number;
  fullscreenExits: number;
  autoSubmitted: boolean;
  submittedAt: string;
  user?: User;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  role: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}
