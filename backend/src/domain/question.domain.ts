import type { Prisma, QuestionType } from "@prisma/client";
import { Option } from "./option.domain.js";

export type PrismaQuestionEntity = Prisma.QuestionGetPayload<{
  include: {
    options: true;
  };
}>;

export class Question {
  constructor(
    public readonly id: string,
    public readonly text: string,
    public readonly type: QuestionType,
    public readonly quizId: string,
    public readonly options: Option[],
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}

  static toDomainModel(prismaEntity: PrismaQuestionEntity): Question {
    return new Question(
      prismaEntity.id,
      prismaEntity.text,
      prismaEntity.type,
      prismaEntity.quizId,
      prismaEntity.options.map(Option.toDomainModel),
      prismaEntity.createdAt,
      prismaEntity.updatedAt,
    );
  }
}
