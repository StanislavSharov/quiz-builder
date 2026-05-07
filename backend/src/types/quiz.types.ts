import type { z } from "zod";
import type { createQuizSchema } from "../validators/quiz.validator.js";

export type CreateQuizInput = z.infer<typeof createQuizSchema>;