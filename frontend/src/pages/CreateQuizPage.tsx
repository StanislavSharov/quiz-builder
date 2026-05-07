import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { quizzesApi } from "../api/quizzesApi";
import { QuizForm } from "../components/QuizForm/QuizForm";
import type { CreateQuizPayload } from "../types/quiz";
import { getQuizDetailsRoute } from "../utils/constants";

export function CreateQuizPage() {
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  async function handleCreateQuiz(payload: CreateQuizPayload) {
    try {
      setIsSubmitting(true);
      setServerError(null);

      const createdQuiz = await quizzesApi.createQuiz(payload);
      navigate(getQuizDetailsRoute(createdQuiz.id));
    } catch {
      setServerError("Failed to create quiz. Please check your input and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h1>Create quiz</h1>
          <p className="page-description">
            Add a quiz title and create one or more questions with different question types.
          </p>
        </div>
      </div>

      {serverError && <p className="error-message">{serverError}</p>}

      <QuizForm onSubmit={handleCreateQuiz} isSubmitting={isSubmitting} />
    </section>
  );
}