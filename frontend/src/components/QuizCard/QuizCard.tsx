import { Link } from "react-router-dom";
import type { QuizListItem } from "../../types/quiz";

interface QuizCardProps {
  quiz: QuizListItem;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

export function QuizCard({ quiz, onDelete, isDeleting = false }: QuizCardProps) {
  return (
    <article className="quiz-card">
      <div>
        <h3 className="quiz-card-title">{quiz.title}</h3>
        <p className="quiz-card-meta">
          {quiz._count.questions} {quiz._count.questions === 1 ? "question" : "questions"}
        </p>
      </div>

      <div className="quiz-card-actions">
        <Link to={`/quizzes/${quiz.id}`} className="button secondary">
          View
        </Link>

        <button
          type="button"
          className="button danger"
          onClick={() => onDelete(quiz.id)}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </article>
  );
}