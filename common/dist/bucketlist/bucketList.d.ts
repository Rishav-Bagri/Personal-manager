import { z } from "zod";
export declare const BKT_CreateSchema: z.ZodObject<{
    userName: z.ZodString;
    title: z.ZodString;
    plan: z.ZodString;
    doneBy: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    userName: string;
    title: string;
    plan: string;
    doneBy?: string | undefined;
}, {
    userName: string;
    title: string;
    plan: string;
    doneBy?: string | undefined;
}>;
export declare const BKT_GetSchema: z.ZodObject<{
    userName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userName: string;
}, {
    userName: string;
}>;
export declare const BKT_UpdateSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    plan: z.ZodOptional<z.ZodString>;
    doneBy: z.ZodOptional<z.ZodString>;
    isDone: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    id: string;
    title?: string | undefined;
    plan?: string | undefined;
    doneBy?: string | undefined;
    isDone?: boolean | undefined;
}, {
    id: string;
    title?: string | undefined;
    plan?: string | undefined;
    doneBy?: string | undefined;
    isDone?: boolean | undefined;
}>;
export type BKT_CreateType = z.infer<typeof BKT_CreateSchema>;
export type BKT_GetType = z.infer<typeof BKT_GetSchema>;
export type BKT_UpdateType = z.infer<typeof BKT_UpdateSchema>;
