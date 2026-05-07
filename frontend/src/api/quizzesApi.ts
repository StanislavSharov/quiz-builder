import axios from "axios";
import type { CreateQuizPayload, Quiz, QuizListItem } from "../types/quiz";

import { API_BASE_URL } from "../config";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const quizzesApi = {
  async getQuizzes(): Promise<QuizListItem[]> {
    const response = await apiClient.get<QuizListItem[]>("/quizzes");
    return response.data;
  },

  async getQuizById(id: string): Promise<Quiz> {
    const response = await apiClient.get<Quiz>(`/quizzes/${id}`);
    return response.data;
  },

  async createQuiz(payload: CreateQuizPayload): Promise<Quiz> {
    const response = await apiClient.post<Quiz>("/quizzes", payload);
    return response.data;
  },

  async deleteQuiz(id: string): Promise<void> {
    await apiClient.delete(`/quizzes/${id}`);
  },
};