import { FormProvider, useFieldArray, useForm } from "react-hook-form";

import type { CreateQuizPayload } from "../../types/quiz";
import { createDefaultQuestion } from "../../utils/constants";
import { QuestionFields } from "../QuestionFields/QuestionFields";

interface QuizFormProps {
  onSubmit: (payload: CreateQuizPayload) => Promise<void>;
  isSubmitting?: boolean;
}

export function QuizForm({ onSubmit, isSubmitting = false }: QuizFormProps) {
  const methods = useForm<CreateQuizPayload>({
    defaultValues: {
      title: "",
      questions: [createDefaultQuestion()],
    },
    mode: "onSubmit",
  });

  const {
    control,
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = methods;

  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
  } = useFieldArray({
    control,
    name: "questions",
  });

  function validateQuizPayload(payload: CreateQuizPayload): string | null {
    if (!payload.title.trim()) {
      return "Quiz title is required.";
    }

    if (payload.questions.length === 0) {
      return "At least one question is required.";
    }

    for (const [index, question] of payload.questions.entries()) {
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

  async function submitForm(values: CreateQuizPayload) {
    clearErrors("root");

    const payload: CreateQuizPayload = {
      title: values.title.trim(),
      questions: values.questions.map((question) => ({
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

    const validationError = validateQuizPayload(payload);

    if (validationError) {
      setError("root", {
        type: "manual",
        message: validationError,
      });

      return;
    }

    await onSubmit(payload);
  }

  return (
    <FormProvider {...methods}>
      <form className="quiz-form" onSubmit={handleSubmit(submitForm)}>
        <label className="field">
          <span>Quiz title</span>
          <input
            {...register("title", {
              required: "Quiz title is required.",
            })}
            placeholder="Example: JavaScript Basics"
          />
        </label>

        {errors.title?.message && (
          <p className="error-message">{errors.title.message}</p>
        )}

        <div className="questions-list">
          {questionFields.map((question, index) => (
            <QuestionFields
              key={question.id}
              index={index}
              onRemove={removeQuestion}
              canRemove={questionFields.length > 1}
            />
          ))}
        </div>

        {errors.root?.message && (
          <p className="error-message">{errors.root.message}</p>
        )}

        <div className="form-actions">
          <button
            type="button"
            className="button secondary"
            onClick={() => appendQuestion(createDefaultQuestion())}
          >
            Add question
          </button>

          <button
            type="submit"
            className="button primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create quiz"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
