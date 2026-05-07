export const queryKeys = {
  quizzes: ["quizzes"] as const,
  quiz: (id: string) => ["quiz", id] as const,
};