import { z } from "zod";
export declare const bucketListCreateSchema: z.ZodObject<{
    title: z.ZodString;
    plan: z.ZodString;
    doneBy: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title: string;
    plan: string;
    doneBy?: string | undefined;
}, {
    title: string;
    plan: string;
    doneBy?: string | undefined;
}>;
export declare const bucketListUpdateSchema: z.ZodObject<{
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
export declare const bucketListDeleteSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export declare const bucketListBulkSchema: z.ZodObject<{
    id: z.ZodString;
    userName: z.ZodString;
    title: z.ZodString;
    plan: z.ZodString;
    createdAt: z.ZodString;
    doneBy: z.ZodNullable<z.ZodString>;
    isDone: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    title: string;
    plan: string;
    doneBy: string | null;
    id: string;
    isDone: boolean;
    userName: string;
    createdAt: string;
}, {
    title: string;
    plan: string;
    doneBy: string | null;
    id: string;
    isDone: boolean;
    userName: string;
    createdAt: string;
}>;
export type BucketListCreateType = z.infer<typeof bucketListCreateSchema>;
export type BucketListUpdateType = z.infer<typeof bucketListUpdateSchema>;
export type BucketListDeleteType = z.infer<typeof bucketListDeleteSchema>;
export type BucketListType = z.infer<typeof bucketListBulkSchema>;
