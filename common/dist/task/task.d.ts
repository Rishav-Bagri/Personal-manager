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
export declare const TaskBulkSchema: z.ZodObject<{
    id: z.ZodString;
    userName: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    done: z.ZodBoolean;
    dueDate: z.ZodNullable<z.ZodString>;
    priority: z.ZodNullable<z.ZodEnum<["HIGH", "MEDIUM", "LOW"]>>;
}, "strip", z.ZodTypeAny, {
    title: string;
    id: string;
    userName: string;
    description: string;
    dueDate: string | null;
    priority: "HIGH" | "MEDIUM" | "LOW" | null;
    done: boolean;
}, {
    title: string;
    id: string;
    userName: string;
    description: string;
    dueDate: string | null;
    priority: "HIGH" | "MEDIUM" | "LOW" | null;
    done: boolean;
}>;
export type TaskCreateType = z.infer<typeof TaskCreateSchema>;
export type TaskUpdateType = z.infer<typeof TaskUpdateSchema>;
export type TaskDeleteType = z.infer<typeof TaskDeleteSchema>;
export type TaskType = z.infer<typeof TaskBulkSchema>;
