import { z } from "zod";
export declare const BGT_CreateSchema: z.ZodObject<{
    userName: z.ZodString;
    thingsToSpend: z.ZodString;
    money: z.ZodString;
    category: z.ZodOptional<z.ZodString>;
    paidBy: z.ZodString;
    paid: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    userName: string;
    thingsToSpend: string;
    money: string;
    paidBy: string;
    paid: boolean;
    category?: string | undefined;
}, {
    userName: string;
    thingsToSpend: string;
    money: string;
    paidBy: string;
    paid: boolean;
    category?: string | undefined;
}>;
export declare const BGT_GetSchema: z.ZodObject<{
    userName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userName: string;
}, {
    userName: string;
}>;
export declare const BGT_UpdateSchema: z.ZodObject<{
    id: z.ZodString;
    thingsToSpend: z.ZodOptional<z.ZodString>;
    money: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodString>;
    paidBy: z.ZodOptional<z.ZodString>;
    paid: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    id: string;
    thingsToSpend?: string | undefined;
    money?: string | undefined;
    category?: string | undefined;
    paidBy?: string | undefined;
    paid?: boolean | undefined;
}, {
    id: string;
    thingsToSpend?: string | undefined;
    money?: string | undefined;
    category?: string | undefined;
    paidBy?: string | undefined;
    paid?: boolean | undefined;
}>;
export type BGT_CreateType = z.infer<typeof BGT_CreateSchema>;
export type BGT_GetType = z.infer<typeof BGT_GetSchema>;
export type BGT_UpdateType = z.infer<typeof BGT_UpdateSchema>;
