import type { Prisma } from "@prisma/client";
import { Question } from "./question.domain.js";

export type PrismaQuizEntity = Prisma.QuizGetPayload<{
  include: {
    questions: {
      include: {
        options: true;
      };
    };
  };
}>;

export type PrismaQuizListEntity = Prisma.QuizGetPayload<{
  select: {
    id: true;
    title: true;
    createdAt: true;
    updatedAt: true;
    questions: {
      select: {
        id: true;
      };
    };
  };
}>;

export class Quiz {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly questions: Question[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static toDomainModel(prismaEntity: PrismaQuizEntity): Quiz {
    return new Quiz(
      prismaEntity.id,
      prismaEntity.title,
      prismaEntity.questions.map(Question.toDomainModel),
      prismaEntity.createdAt,
      prismaEntity.updatedAt,
    );
  }

  static toListItemDomainModel(prismaEntity: PrismaQuizListEntity) {
    return {
      id: prismaEntity.id,
      title: prismaEntity.title,
      createdAt: prismaEntity.createdAt,
      updatedAt: prismaEntity.updatedAt,
      questionCount: prismaEntity.questions.length,
    };
  }
}
