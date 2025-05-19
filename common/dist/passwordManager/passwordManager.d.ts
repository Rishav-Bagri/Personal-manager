import { z } from "zod";
export declare const passwordManagerCreateSchema: z.ZodObject<{
    domain: z.ZodString;
    password: z.ZodString;
    notes: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    domain: string;
    password: string;
    notes?: string | undefined;
}, {
    domain: string;
    password: string;
    notes?: string | undefined;
}>;
export declare const passwordManagerGetPasswordByIdSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export declare const passwordManagerUpdateSchema: z.ZodObject<{
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
export declare const passwordManagerDeleteSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export type PasswordManagerCreateInput = z.infer<typeof passwordManagerCreateSchema>;
export type PasswordManagerGetPasswordByIdInput = z.infer<typeof passwordManagerGetPasswordByIdSchema>;
export type PasswordManagerUpdateInput = z.infer<typeof passwordManagerUpdateSchema>;
export type PasswordManagerDeleteInput = z.infer<typeof passwordManagerDeleteSchema>;
