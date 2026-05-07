import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import { quizzesApi } from "../api/quizzesApi";
import { queryKeys } from "../api/queryKeys";
import { APP_ROUTES } from "../utils/constants";

export function QuizDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const {
    data: quiz,
    isPending,
    isError,
  } = useQuery({
    queryKey: queryKeys.quiz(id ?? ""),
    queryFn: () => quizzesApi.getQuizById(id as string),
    enabled: Boolean(id),
  });

  if (!id) {
    return (
      <section className="page">
        <p className="error-message">Quiz id is missing.</p>

        <Link to={APP_ROUTES.QUIZZES} className="button secondary">
          Back to quizzes
        </Link>
      </section>
    );
  }

  if (isPending) {
    return <p className="state-message">Loading quiz...</p>;
  }

  if (isError) {
    return (
      <section className="page">
        <p className="error-message">Failed to load quiz details.</p>

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