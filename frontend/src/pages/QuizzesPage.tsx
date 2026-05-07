import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { quizzesApi } from "../api/quizzesApi";
import { QuizCard } from "../components/QuizCard/QuizCard";
import type { QuizListItem } from "../types/quiz";
import { APP_ROUTES } from "../utils/constants";

export function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<QuizListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function loadQuizzes() {
    try {
      setIsLoading(true);
      setError(null);

      const data = await quizzesApi.getQuizzes();
      setQuizzes(data);
    } catch {
      setError("Failed to load quizzes. Please check if the backend server is running.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm("Are you sure you want to delete this quiz?");

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      await quizzesApi.deleteQuiz(id);
      setQuizzes((currentQuizzes) => currentQuizzes.filter((quiz) => quiz.id !== id));
    } catch {
      setError("Failed to delete quiz.");
    } finally {
      setDeletingId(null);
    }
  }

  useEffect(() => {
    loadQuizzes();
  }, []);

  if (isLoading) {
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

      {error && <p className="error-message">{error}</p>}

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
          {quizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              onDelete={handleDelete}
              isDeleting={deletingId === quiz.id}
            />
          ))}
        </div>
      )}
    </section>
  );
}