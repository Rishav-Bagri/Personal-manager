import { z } from 'zod';
export declare const UserCreateSchema: z.ZodObject<{
    name: z.ZodString;
    userName: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userName: string;
    password: string;
    name: string;
    email: string;
}, {
    userName: string;
    password: string;
    name: string;
    email: string;
}>;
export declare const UserLoginSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    email: string;
}, {
    password: string;
    email: string;
}>;
export declare const UserUpdateSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
    userName: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    userName?: string | undefined;
    password?: string | undefined;
    name?: string | undefined;
    email?: string | undefined;
}, {
    id: string;
    userName?: string | undefined;
    password?: string | undefined;
    name?: string | undefined;
    email?: string | undefined;
}>;
export type UserCreateType = z.infer<typeof UserCreateSchema>;
export type UserLoginType = z.infer<typeof UserLoginSchema>;
export type UserUpdateType = z.infer<typeof UserUpdateSchema>;
