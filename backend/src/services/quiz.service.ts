import { Prisma } from "@prisma/client";

import { prisma } from "../db/prisma.js";
import { Quiz } from "../domain/quiz.domain.js";
import type { CreateQuizInput } from "../types/quiz.types.js";

export const quizService = {
  async createQuiz(data: CreateQuizInput) {
    const createdQuiz = await prisma.quiz.create({
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

    return Quiz.toDomainModel(createdQuiz);
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

    return quizzes.map(Quiz.toListItemDomainModel);
  },

  async getQuizById(id: string) {
    const quiz = await prisma.quiz.findUnique({
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

    if (!quiz) {
      return null;
    }

    return Quiz.toDomainModel(quiz);
  },

  async deleteQuiz(id: string) {
    try {
      const deletedQuiz = await prisma.quiz.delete({
        where: {
          id,
        },
        include: {
          questions: {
            include: {
              options: true,
            },
          },
        },
      });

      return Quiz.toDomainModel(deletedQuiz);
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
