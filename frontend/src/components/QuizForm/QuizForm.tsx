import { useState } from "react";
import type { CreateQuizPayload, Question } from "../../types/quiz";
import { createDefaultQuestion } from "../../utils/constants";
import { QuestionFields } from "../QuestionFields/QuestionFields";

interface QuizFormProps {
  onSubmit: (payload: CreateQuizPayload) => Promise<void>;
  isSubmitting?: boolean;
}

interface FormError {
  message: string;
}

export function QuizForm({ onSubmit, isSubmitting = false }: QuizFormProps) {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<Question[]>([createDefaultQuestion()]);
  const [error, setError] = useState<FormError | null>(null);

  function updateQuestion(index: number, updatedQuestion: Question) {
    setQuestions((currentQuestions) =>
      currentQuestions.map((question, currentIndex) =>
        currentIndex === index ? updatedQuestion : question
      )
    );
  }

  function addQuestion() {
    setQuestions((currentQuestions) => [...currentQuestions, createDefaultQuestion()]);
  }

  function removeQuestion(index: number) {
    setQuestions((currentQuestions) =>
      currentQuestions.filter((_, currentIndex) => currentIndex !== index)
    );
  }

  function validateForm(): string | null {
    if (!title.trim()) {
      return "Quiz title is required.";
    }

    if (questions.length === 0) {
      return "At least one question is required.";
    }

    for (const [index, question] of questions.entries()) {
      if (!question.text.trim()) {
        return `Question ${index + 1} text is required.`;
      }

      if (question.type === "BOOLEAN") {
        if (question.options.length !== 2) {
          return `Question ${index + 1} must have exactly two boolean options.`;
        }

        if (!question.options.some((option) => option.isCorrect)) {
          return `Question ${index + 1} must have one correct boolean option.`;
        }
      }

      if (question.type === "CHECKBOX") {
        if (question.options.length < 2) {
          return `Question ${index + 1} must have at least two options.`;
        }

        if (question.options.some((option) => !option.text.trim())) {
          return `All options in question ${index + 1} must have text.`;
        }

        if (!question.options.some((option) => option.isCorrect)) {
          return `Question ${index + 1} must have at least one correct option.`;
        }
      }
    }

    return null;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError({ message: validationError });
      return;
    }

    setError(null);

    const payload: CreateQuizPayload = {
      title: title.trim(),
      questions: questions.map((question) => ({
        text: question.text.trim(),
        type: question.type,
        options:
          question.type === "INPUT"
            ? []
            : question.options.map((option) => ({
                text: option.text.trim(),
                isCorrect: option.isCorrect,
              })),
      })),
    };

    await onSubmit(payload);
  }

  return (
    <form className="quiz-form" onSubmit={handleSubmit}>
      <label className="field">
        <span>Quiz title</span>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Example: JavaScript Basics"
        />
      </label>

      <div className="questions-list">
        {questions.map((question, index) => (
          <QuestionFields
            key={index}
            question={question}
            index={index}
            onChange={updateQuestion}
            onRemove={removeQuestion}
            canRemove={questions.length > 1}
          />
        ))}
      </div>

      {error && <p className="error-message">{error.message}</p>}

      <div className="form-actions">
        <button type="button" className="button secondary" onClick={addQuestion}>
          Add question
        </button>

        <button type="submit" className="button primary" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Create quiz"}
        </button>
      </div>
    </form>
  );
}