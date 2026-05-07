import { z } from "zod";
export const questionTypeSchema = z.enum(["BOOLEAN", "INPUT", "CHECKBOX"]);
export const optionSchema = z.object({
    text: z.string().trim().min(1, "Option text is required."),
    isCorrect: z.boolean().default(false)
});
export const questionSchema = z
    .object({
    text: z.string().trim().min(1, "Question text is required."),
    type: questionTypeSchema,
    options: z.array(optionSchema).optional().default([])
})
    .superRefine((question, ctx) => {
    if (question.type === "BOOLEAN") {
        if (question.options.length !== 2) {
            ctx.addIssue({
                code: "custom",
                path: ["options"],
                message: "Boolean question must have exactly two options."
            });
        }
    }
    if (question.type === "CHECKBOX") {
        if (question.options.length < 2) {
            ctx.addIssue({
                code: "custom",
                path: ["options"],
                message: "Checkbox question must have at least two options."
            });
        }
        const hasCorrectOption = question.options.some((option) => option.isCorrect);
        if (!hasCorrectOption) {
            ctx.addIssue({
                code: "custom",
                path: ["options"],
                message: "Checkbox question must have at least one correct option."
            });
        }
    }
    if (question.type === "INPUT" && question.options.length > 0) {
        ctx.addIssue({
            code: "custom",
            path: ["options"],
            message: "Input question should not have options."
        });
    }
});
export const createQuizSchema = z.object({
    title: z.string().trim().min(1, "Quiz title is required."),
    questions: z.array(questionSchema).min(1, "Quiz must contain at least one question.")
});
//# sourceMappingURL=quiz.validator.js.map