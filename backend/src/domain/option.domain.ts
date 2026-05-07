import type { Prisma } from "@prisma/client";

export type PrismaOptionEntity = Prisma.OptionGetPayload<Record<string, never>>;

export class Option {
  constructor(
    public readonly id: string,
    public readonly text: string,
    public readonly isCorrect: boolean,
    public readonly questionId: string,
  ) {}

  static toDomainModel(prismaEntity: PrismaOptionEntity): Option {
    return new Option(
      prismaEntity.id,
      prismaEntity.text,
      prismaEntity.isCorrect,
      prismaEntity.questionId,
    );
  }
}
