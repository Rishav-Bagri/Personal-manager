import { z } from "zod";
export declare const ReminderCreateSchema: z.ZodObject<{
    title: z.ZodString;
    time: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    time: string;
}, {
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
export type ReminderCreateInput = z.infer<typeof ReminderCreateSchema>;
export type ReminderDeleteInput = z.infer<typeof ReminderDeleteSchema>;
export type ReminderType = {
    id: string;
    title: string;
    time: string;
};
