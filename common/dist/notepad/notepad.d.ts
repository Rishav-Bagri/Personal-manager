import { z } from "zod";
export declare const notepadCreateSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export declare const notepadUpdateSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    id: string;
    title?: string | undefined;
    content?: string | undefined;
}, {
    id: string;
    title?: string | undefined;
    content?: string | undefined;
}>;
export declare const notepadDeleteSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export type NotepadCreateInput = z.infer<typeof notepadCreateSchema>;
export type NotepadUpdateInput = z.infer<typeof notepadUpdateSchema>;
export type NotepadDeleteInput = z.infer<typeof notepadDeleteSchema>;
export type NotepadType = {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
};
