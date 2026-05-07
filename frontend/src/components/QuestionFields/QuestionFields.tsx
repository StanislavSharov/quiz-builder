import type { Option, Question, QuestionType } from "../../types/quiz";
import {
  DEFAULT_BOOLEAN_OPTIONS,
  QUESTION_TYPES,
  createDefaultCheckboxOptions,
} from "../../utils/constants";

interface QuestionFieldsProps {
  question: Question;
  index: number;
  onChange: (index: number, question: Question) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
}

export function QuestionFields({
  question,
  index,
  onChange,
  onRemove,
  canRemove,
}: QuestionFieldsProps) {
  function updateQuestion(partial: Partial<Question>) {
    onChange(index, {
      ...question,
      ...partial,
    });
  }

  function handleTypeChange(type: QuestionType) {
    if (type === "BOOLEAN") {
      updateQuestion({
        type,
        options: DEFAULT_BOOLEAN_OPTIONS,
      });
      return;
    }

    if (type === "CHECKBOX") {
      updateQuestion({
        type,
        options: createDefaultCheckboxOptions(),
      });
      return;
    }

    updateQuestion({
      type,
      options: [],
    });
  }

  function updateOption(optionIndex: number, partial: Partial<Option>) {
    const updatedOptions = question.options.map((option, currentIndex) =>
      currentIndex === optionIndex ? { ...option, ...partial } : option
    );

    updateQuestion({
      options: updatedOptions,
    });
  }

  function addOption() {
    updateQuestion({
      options: [...question.options, { text: "", isCorrect: false }],
    });
  }

  function removeOption(optionIndex: number) {
    updateQuestion({
      options: question.options.filter((_, currentIndex) => currentIndex !== optionIndex),
    });
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
          value={question.text}
          onChange={(event) => updateQuestion({ text: event.target.value })}
          placeholder="Enter question text"
        />
      </label>

      <label className="field">
        <span>Question type</span>
        <select
          value={question.type}
          onChange={(event) => handleTypeChange(event.target.value as QuestionType)}
        >
          {QUESTION_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </label>

      {question.type === "INPUT" && (
        <p className="hint">
          Input questions do not require predefined options. The answer will be entered as short
          text.
        </p>
      )}

      {question.type === "BOOLEAN" && (
        <div className="options-block">
          <p className="section-label">Boolean options</p>

          {question.options.map((option, optionIndex) => (
            <div key={optionIndex} className="option-row readonly-option">
              <input value={option.text} disabled />
              <label className="checkbox-label">
                <input
                  type="radio"
                  name={`boolean-correct-${index}`}
                  checked={option.isCorrect}
                  onChange={() => {
                    const updatedOptions = question.options.map((currentOption, currentIndex) => ({
                      ...currentOption,
                      isCorrect: currentIndex === optionIndex,
                    }));

                    updateQuestion({ options: updatedOptions });
                  }}
                />
                Correct
              </label>
            </div>
          ))}
        </div>
      )}

      {question.type === "CHECKBOX" && (
        <div className="options-block">
          <div className="options-header">
            <p className="section-label">Checkbox options</p>

            <button type="button" className="button secondary" onClick={addOption}>
              Add option
            </button>
          </div>

          {question.options.map((option, optionIndex) => (
            <div key={optionIndex} className="option-row">
              <input
                value={option.text}
                onChange={(event) => updateOption(optionIndex, { text: event.target.value })}
                placeholder={`Option ${optionIndex + 1}`}
              />

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={option.isCorrect}
                  onChange={(event) =>
                    updateOption(optionIndex, { isCorrect: event.target.checked })
                  }
                />
                Correct
              </label>

              <button
                type="button"
                className="button ghost danger-text"
                onClick={() => removeOption(optionIndex)}
                disabled={question.options.length <= 2}
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