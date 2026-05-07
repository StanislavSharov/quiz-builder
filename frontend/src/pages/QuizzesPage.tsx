import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { quizzesApi } from "../api/quizzesApi";
import { queryKeys } from "../api/queryKeys";
import { QuizCard } from "../components/QuizCard/QuizCard";
import type { QuizListItem } from "../types/quiz";
import { APP_ROUTES } from "../utils/constants";

export function QuizzesPage() {
  const queryClient = useQueryClient();

  const {
    data: quizzes = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: queryKeys.quizzes,
    queryFn: quizzesApi.getQuizzes,
  });

  const deleteQuizMutation = useMutation({
    mutationFn: quizzesApi.deleteQuiz,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.quizzes,
      });
    },
  });

  function handleDelete(id: string) {
    const confirmed = window.confirm("Are you sure you want to delete this quiz?");

    if (!confirmed) {
      return;
    }

    deleteQuizMutation.mutate(id);
  }

  if (isPending) {
    return <p className="state-message">Loading quizzes...</p>;
  }

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h1>Quizzes</h1>
          <p className="page-description">View, open, and delete created quizzes.</p>
        </div>

        <Link to={APP_ROUTES.CREATE_QUIZ} className="button primary">
          Create quiz
        </Link>
      </div>

      {isError && (
        <p className="error-message">
          Failed to load quizzes. Please check if the backend server is running.
        </p>
      )}

      {deleteQuizMutation.isError && (
        <p className="error-message">Failed to delete quiz.</p>
      )}

      {quizzes.length === 0 ? (
        <div className="empty-state">
          <h2>No quizzes yet</h2>
          <p>Create your first quiz to see it here.</p>

          <Link to={APP_ROUTES.CREATE_QUIZ} className="button primary">
            Create quiz
          </Link>
        </div>
      ) : (
        <div className="quiz-grid">
          {quizzes.map((quiz: QuizListItem) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              onDelete={handleDelete}
              isDeleting={
                deleteQuizMutation.isPending && deleteQuizMutation.variables === quiz.id
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}