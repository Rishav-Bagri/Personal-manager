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
export type BucketListCreateType = z.infer<typeof bucketListCreateSchema>;
export type BucketListUpdateType = z.infer<typeof bucketListUpdateSchema>;
