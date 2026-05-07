import { Prisma } from "@prisma/client";
import { prisma } from "../db/prisma.js";
import type { CreateQuizInput } from "../types/quiz.types.js";

export const quizService = {
  async createQuiz(data: CreateQuizInput) {
    return prisma.quiz.create({
      data: {
        title: data.title,
        questions: {
          create: data.questions.map((question) => {
            const shouldCreateOptions =
              question.type !== "INPUT" && question.options.length > 0;

            return {
              text: question.text,
              type: question.type,
              ...(shouldCreateOptions
                ? {
                    options: {
                      create: question.options.map((option) => ({
                        text: option.text,
                        isCorrect: option.isCorrect,
                      })),
                    },
                  }
                : {}),
            };
          }),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
  },

  async getAllQuizzes() {
    const quizzes = await prisma.quiz.findMany({
      select: {
        id: true,
        title: true,
        createdAt: true,
        updatedAt: true,
        questions: {
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return quizzes.map((quiz) => ({
      id: quiz.id,
      title: quiz.title,
      createdAt: quiz.createdAt,
      updatedAt: quiz.updatedAt,
      questionCount: quiz.questions.length,
    }));
  },

  async getQuizById(id: string) {
    return prisma.quiz.findUnique({
      where: {
        id,
      },
      include: {
        questions: {
          include: {
            options: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
  },

  async deleteQuiz(id: string) {
    try {
      return await prisma.quiz.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2025"
      ) {
        return null;
      }

      throw error;
    }
  },
};
