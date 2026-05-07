import { Prisma } from "@prisma/client";
import { prisma } from "../db/prisma.js";
export const quizService = {
    async createQuiz(data) {
        return prisma.quiz.create({
            data: {
                title: data.title,
                questions: {
                    create: data.questions.map((question) => {
                        const shouldCreateOptions = question.type !== "INPUT" && question.options.length > 0;
                        return {
                            text: question.text,
                            type: question.type,
                            ...(shouldCreateOptions
                                ? {
                                    options: {
                                        create: question.options.map((option) => ({
                                            text: option.text,
                                            isCorrect: option.isCorrect
                                        }))
                                    }
                                }
                                : {})
                        };
                    })
                }
            },
            include: {
                questions: {
                    include: {
                        options: true
                    },
                    orderBy: {
                        createdAt: "asc"
                    }
                }
            }
        });
    },
    async getAllQuizzes() {
        return prisma.quiz.findMany({
            select: {
                id: true,
                title: true,
                createdAt: true,
                updatedAt: true,
                _count: {
                    select: {
                        questions: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });
    },
    async getQuizById(id) {
        return prisma.quiz.findUnique({
            where: {
                id
            },
            include: {
                questions: {
                    include: {
                        options: true
                    },
                    orderBy: {
                        createdAt: "asc"
                    }
                }
            }
        });
    },
    async deleteQuiz(id) {
        try {
            return await prisma.quiz.delete({
                where: {
                    id
                }
            });
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
                return null;
            }
            throw error;
        }
    }
};
//# sourceMappingURL=quiz.service.js.map