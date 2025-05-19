import { z } from "zod";
export declare const ReminderCreateSchema: z.ZodObject<{
    userName: z.ZodString;
    title: z.ZodString;
    time: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userName: string;
    title: string;
    time: string;
}, {
    userName: string;
    title: string;
    time: string;
}>;
export declare const ReminderDeleteSchema: z.ZodObject<{
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
}, {
    id: string;
}>;
export declare const ReminderListSchema: z.ZodObject<{
    userName: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userName: string;
}, {
    userName: string;
}>;
export type ReminderCreateInput = z.infer<typeof ReminderCreateSchema>;
export type ReminderDeleteInput = z.infer<typeof ReminderDeleteSchema>;
export type ReminderListInput = z.infer<typeof ReminderListSchema>;
