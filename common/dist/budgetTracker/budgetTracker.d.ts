import { z } from "zod";
export declare const budgetTrackerCreateSchema: z.ZodObject<{
    thingsToSpend: z.ZodString;
    money: z.ZodString;
    category: z.ZodOptional<z.ZodString>;
    paidBy: z.ZodString;
    paid: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    thingsToSpend: string;
    money: string;
    paidBy: string;
    paid: boolean;
    category?: string | undefined;
}, {
    thingsToSpend: string;
    money: string;
    paidBy: string;
    paid: boolean;
    category?: string | undefined;
}>;
export declare const budgetTrackerUpdateSchema: z.ZodObject<{
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
export type BudgetTrackerCreateType = z.infer<typeof budgetTrackerCreateSchema>;
export type BudgetTrackerUpdateType = z.infer<typeof budgetTrackerUpdateSchema>;
