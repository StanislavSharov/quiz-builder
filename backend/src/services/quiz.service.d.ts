import type { CreateQuizInput } from "../types/quiz.types.js";
export declare const quizService: {
    createQuiz(data: CreateQuizInput): Promise<{
        questions: ({
            options: {
                text: string;
                isCorrect: boolean;
                id: string;
                questionId: string;
            }[];
        } & {
            type: import("@prisma/client").$Enums.QuestionType;
            text: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            quizId: string;
        })[];
    } & {
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllQuizzes(): Promise<{
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        _count: {
            questions: number;
        };
    }[]>;
    getQuizById(id: string): Promise<({
        questions: ({
            options: {
                text: string;
                isCorrect: boolean;
                id: string;
                questionId: string;
            }[];
        } & {
            type: import("@prisma/client").$Enums.QuestionType;
            text: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            quizId: string;
        })[];
    } & {
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }) | null>;
    deleteQuiz(id: string): Promise<{
        title: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
};
//# sourceMappingURL=quiz.service.d.ts.map