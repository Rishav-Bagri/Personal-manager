import { z } from "zod";
export declare const TaskCreateSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    dueDate: z.ZodOptional<z.ZodDate>;
    priority: z.ZodOptional<z.ZodEnum<["HIGH", "MEDIUM", "LOW"]>>;
}, "strip", z.ZodTypeAny, {
    title: string;
    description: string;
    dueDate?: Date | undefined;
    priority?: "HIGH" | "MEDIUM" | "LOW" | undefined;
}, {
    title: string;
    description: string;
    dueDate?: Date | undefined;
    priority?: "HIGH" | "MEDIUM" | "LOW" | undefined;
}>;
export declare const TaskUpdateSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    dueDate: z.ZodOptional<z.ZodDate>;
    priority: z.ZodOptional<z.ZodEnum<["HIGH", "MEDIUM", "LOW"]>>;
    done: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    id: string;
    title?: string | undefined;
    description?: string | undefined;
    dueDate?: Date | undefined;
    priority?: "HIGH" | "MEDIUM" | "LOW" | undefined;
    done?: boolean | undefined;
}, {
    id: string;
    title?: string | undefined;
    description?: string | undefined;
    dueDate?: Date | undefined;
    priority?: "HIGH" | "MEDIUM" | "LOW" | undefined;
    done?: boolean | undefined;
}>;
export declare const TaskDeleteSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export type TaskCreateType = z.infer<typeof TaskCreateSchema>;
export type TaskUpdateType = z.infer<typeof TaskUpdateSchema>;
export type TaskDeleteType = z.infer<typeof TaskDeleteSchema>;
