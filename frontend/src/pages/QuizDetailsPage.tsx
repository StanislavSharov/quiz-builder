import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { quizzesApi } from "../api/quizzesApi";
import type { Quiz } from "../types/quiz";
import { APP_ROUTES } from "../utils/constants";

export function QuizDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadQuiz() {
      if (!id) {
        if (isMounted) {
          setError("Quiz id is missing.");
          setIsLoading(false);
        }

        return;
      }

      try {
        if (isMounted) {
          setIsLoading(true);
          setError(null);
        }

        const data = await quizzesApi.getQuizById(id);

        if (isMounted) {
          setQuiz(data);
        }
      } catch {
        if (isMounted) {
          setError("Failed to load quiz details.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadQuiz();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return <p className="state-message">Loading quiz...</p>;
  }

  if (error) {
    return (
      <section className="page">
        <p className="error-message">{error}</p>

        <Link to={APP_ROUTES.QUIZZES} className="button secondary">
          Back to quizzes
        </Link>
      </section>
    );
  }

  if (!quiz) {
    return (
      <section className="page">
        <p className="state-message">Quiz not found.</p>

        <Link to={APP_ROUTES.QUIZZES} className="button secondary">
          Back to quizzes
        </Link>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="page-header">
        <div>
          <h1>{quiz.title}</h1>
          <p className="page-description">
            Read-only quiz structure. This page is for viewing questions, not for solving the quiz.
          </p>
        </div>

        <Link to={APP_ROUTES.QUIZZES} className="button secondary">
          Back
        </Link>
      </div>

      <div className="details-list">
        {quiz.questions.map((question, index) => (
          <article key={question.id ?? index} className="details-card">
            <div className="question-title-row">
              <h3>
                {index + 1}. {question.text}
              </h3>

              <span className="badge">{question.type}</span>
            </div>

            {question.type === "INPUT" ? (
              <p className="hint">Short text answer question.</p>
            ) : (
              <ul className="options-list">
                {question.options.map((option, optionIndex) => (
                  <li key={option.id ?? `${option.text}-${optionIndex}`}>
                    <span>{option.text}</span>

                    {option.isCorrect && (
                      <span className="correct-label">Correct answer</span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}