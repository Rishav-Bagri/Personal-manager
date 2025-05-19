import { z } from "zod";
export declare const PM_CreateSchema: z.ZodObject<{
    userName: z.ZodString;
    domain: z.ZodString;
    password: z.ZodString;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    userName: string;
    domain: string;
    password: string;
    notes?: string | undefined;
}, {
    userName: string;
    domain: string;
    password: string;
    notes?: string | undefined;
}>;
export declare const PM_GetDomainsSchema: z.ZodObject<{
    userName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userName: string;
}, {
    userName: string;
}>;
export declare const PM_GetPasswordById: z.ZodObject<{
    userName: z.ZodString;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userName: string;
    id: string;
}, {
    userName: string;
    id: string;
}>;
export declare const PM_UpdateSchema: z.ZodObject<{
    id: z.ZodString;
    password: z.ZodString;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    password: string;
    notes?: string | undefined;
}, {
    id: string;
    password: string;
    notes?: string | undefined;
}>;
export declare const PM_DeleteSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export type PM_CreateInput = z.infer<typeof PM_CreateSchema>;
export type PM_GetDomainsInput = z.infer<typeof PM_GetDomainsSchema>;
export type PM_GetPasswordById = z.infer<typeof PM_GetPasswordById>;
export type PM_UpdateInput = z.infer<typeof PM_UpdateSchema>;
export type PM_DeleteInput = z.infer<typeof PM_DeleteSchema>;
