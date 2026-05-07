import type { Option, Question, QuestionType } from "../types/quiz";

export const QUESTION_TYPES: { label: string; value: QuestionType }[] = [
  { label: "Boolean", value: "BOOLEAN" },
  { label: "Input", value: "INPUT" },
  { label: "Checkbox", value: "CHECKBOX" },
];

export const DEFAULT_BOOLEAN_OPTIONS: Option[] = [
  { text: "True", isCorrect: true },
  { text: "False", isCorrect: false },
];

export const createDefaultQuestion = (): Question => ({
  text: "",
  type: "INPUT",
  options: [],
});

export const createDefaultCheckboxOptions = (): Option[] => [
  { text: "", isCorrect: false },
  { text: "", isCorrect: false },
];