import { z } from "zod";
export declare const questionTypeSchema: z.ZodEnum<{
    BOOLEAN: "BOOLEAN";
    INPUT: "INPUT";
    CHECKBOX: "CHECKBOX";
}>;
export declare const optionSchema: z.ZodObject<{
    text: z.ZodString;
    isCorrect: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export declare const questionSchema: z.ZodObject<{
    text: z.ZodString;
    type: z.ZodEnum<{
        BOOLEAN: "BOOLEAN";
        INPUT: "INPUT";
        CHECKBOX: "CHECKBOX";
    }>;
    options: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
        text: z.ZodString;
        isCorrect: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>>>>;
}, z.core.$strip>;
export declare const createQuizSchema: z.ZodObject<{
    title: z.ZodString;
    questions: z.ZodArray<z.ZodObject<{
        text: z.ZodString;
        type: z.ZodEnum<{
            BOOLEAN: "BOOLEAN";
            INPUT: "INPUT";
            CHECKBOX: "CHECKBOX";
        }>;
        options: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodObject<{
            text: z.ZodString;
            isCorrect: z.ZodDefault<z.ZodBoolean>;
        }, z.core.$strip>>>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
//# sourceMappingURL=quiz.validator.d.ts.map