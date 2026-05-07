import {
  useFieldArray,
  type Control,
  type FieldErrors,
  type UseFormRegister,
  type UseFormSetValue,
  type UseFormWatch,
} from "react-hook-form";

import type { CreateQuizPayload, Option, QuestionType } from "../../types/quiz";
import {
  DEFAULT_BOOLEAN_OPTIONS,
  QUESTION_TYPES,
  createDefaultCheckboxOptions,
} from "../../utils/constants";

interface QuestionFieldsProps {
  index: number;
  control: Control<CreateQuizPayload>;
  register: UseFormRegister<CreateQuizPayload>;
  setValue: UseFormSetValue<CreateQuizPayload>;
  watch: UseFormWatch<CreateQuizPayload>;
  errors: FieldErrors<CreateQuizPayload>;
  onRemove: (index: number) => void;
  canRemove: boolean;
}

function cloneOptions(options: Option[]) {
  return options.map((option) => ({
    text: option.text,
    isCorrect: option.isCorrect,
  }));
}

export function QuestionFields({
  index,
  control,
  register,
  setValue,
  watch,
  errors,
  onRemove,
  canRemove,
}: QuestionFieldsProps) {
  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
    replace: replaceOptions,
  } = useFieldArray({
    control,
    name: `questions.${index}.options`,
  });

  const questionType = watch(`questions.${index}.type`);
  const questionOptions = watch(`questions.${index}.options`) ?? [];

  function handleTypeChange(type: QuestionType) {
    setValue(`questions.${index}.type`, type, {
      shouldDirty: true,
      shouldValidate: true,
    });

    if (type === "BOOLEAN") {
      replaceOptions(cloneOptions(DEFAULT_BOOLEAN_OPTIONS));
      return;
    }

    if (type === "CHECKBOX") {
      replaceOptions(cloneOptions(createDefaultCheckboxOptions()));
      return;
    }

    replaceOptions([]);
  }

  function handleBooleanCorrectChange(optionIndex: number) {
    const updatedOptions = questionOptions.map((option, currentIndex) => ({
      text: option.text,
      isCorrect: currentIndex === optionIndex,
    }));

    replaceOptions(updatedOptions);
  }

  return (
    <section className="question-card">
      <div className="question-card-header">
        <h3>Question {index + 1}</h3>

        <button
          type="button"
          className="button ghost danger-text"
          onClick={() => onRemove(index)}
          disabled={!canRemove}
        >
          Remove
        </button>
      </div>

      <label className="field">
        <span>Question text</span>
        <input
          {...register(`questions.${index}.text`, {
            required: `Question ${index + 1} text is required.`,
          })}
          placeholder="Enter question text"
        />
      </label>

      {errors.questions?.[index]?.text?.message && (
        <p className="error-message">{errors.questions[index]?.text?.message}</p>
      )}

      <label className="field">
        <span>Question type</span>
        <select
          value={questionType}
          onChange={(event) => handleTypeChange(event.target.value as QuestionType)}
        >
          {QUESTION_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </label>

      {questionType === "INPUT" && (
        <p className="hint">
          Input questions do not require predefined options. The answer will be entered as short
          text.
        </p>
      )}

      {questionType === "BOOLEAN" && (
        <div className="options-block">
          <p className="section-label">Boolean options</p>

          {optionFields.map((option, optionIndex) => (
            <div key={option.id} className="option-row readonly-option">
              <input value={questionOptions[optionIndex]?.text ?? ""} disabled />

              <label className="checkbox-label">
                <input
                  type="radio"
                  name={`boolean-correct-${index}`}
                  checked={Boolean(questionOptions[optionIndex]?.isCorrect)}
                  onChange={() => handleBooleanCorrectChange(optionIndex)}
                />
                Correct
              </label>
            </div>
          ))}
        </div>
      )}

      {questionType === "CHECKBOX" && (
        <div className="options-block">
          <div className="options-header">
            <p className="section-label">Checkbox options</p>

            <button
              type="button"
              className="button secondary"
              onClick={() => appendOption({ text: "", isCorrect: false })}
            >
              Add option
            </button>
          </div>

          {optionFields.map((option, optionIndex) => (
            <div key={option.id} className="option-row">
              <input
                {...register(`questions.${index}.options.${optionIndex}.text`, {
                  required: "Option text is required.",
                })}
                placeholder={`Option ${optionIndex + 1}`}
              />

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  {...register(`questions.${index}.options.${optionIndex}.isCorrect`)}
                />
                Correct
              </label>

              <button
                type="button"
                className="button ghost danger-text"
                onClick={() => removeOption(optionIndex)}
                disabled={optionFields.length <= 2}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}