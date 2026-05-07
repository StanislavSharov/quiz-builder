import { ZodError } from "zod";
import { createQuizSchema } from "../validators/quiz.validator.js";
import { quizService } from "../services/quiz.service.js";
function formatZodError(error) {
    return error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message
    }));
}
export async function createQuizController(req, res, next) {
    try {
        const validatedData = createQuizSchema.parse(req.body);
        const quiz = await quizService.createQuiz(validatedData);
        return res.status(201).json(quiz);
    }
    catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                message: "Validation failed.",
                errors: formatZodError(error)
            });
        }
        return next(error);
    }
}
export async function getQuizzesController(_req, res, next) {
    try {
        const quizzes = await quizService.getAllQuizzes();
        return res.status(200).json(quizzes);
    }
    catch (error) {
        return next(error);
    }
}
export async function getQuizByIdController(req, res, next) {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                message: "Quiz id is required."
            });
        }
        const quiz = await quizService.getQuizById(id);
        if (!quiz) {
            return res.status(404).json({
                message: "Quiz not found."
            });
        }
        return res.status(200).json(quiz);
    }
    catch (error) {
        return next(error);
    }
}
export async function deleteQuizController(req, res, next) {
    try {
        const { id } = req.params;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                message: "Quiz id is required."
            });
        }
        const deletedQuiz = await quizService.deleteQuiz(id);
        if (!deletedQuiz) {
            return res.status(404).json({
                message: "Quiz not found."
            });
        }
        return res.status(204).send();
    }
    catch (error) {
        return next(error);
    }
}
//# sourceMappingURL=quiz.controller.js.map