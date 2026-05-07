import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { quizzesApi } from "../api/quizzesApi";
import { queryKeys } from "../api/queryKeys";
import { QuizForm } from "../components/QuizForm/QuizForm";
import type { CreateQuizPayload } from "../types/quiz";
import { getQuizDetailsRoute } from "../utils/constants";

export function CreateQuizPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createQuizMutation = useMutation({
    mutationFn: quizzesApi.createQuiz,
    onSuccess: async (createdQuiz) => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.quizzes,
      });

      navigate(getQuizDetailsRoute(createdQuiz.id));
    },
  });

  async function handleCreateQuiz(payload: CreateQuizPayload) {
    await createQuizMutation.mutateAsync(payload);
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

      {createQuizMutation.isError && (
        <p className="error-message">
          Failed to create quiz. Please check your input and try again.
        </p>
      )}

      <QuizForm
        onSubmit={handleCreateQuiz}
        isSubmitting={createQuizMutation.isPending}
      />
    </section>
  );
}