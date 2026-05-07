export type QuestionType = "BOOLEAN" | "INPUT" | "CHECKBOX";

export interface Option {
  id?: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id?: string;
  text: string;
  type: QuestionType;
  options: Option[];
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}

export interface QuizListItem {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  questionCount: number;
}

export interface CreateQuizPayload {
  title: string;
  questions: Question[];
}