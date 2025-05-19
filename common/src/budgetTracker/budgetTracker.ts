import { z } from "zod"

// Schemas
export const budgetTrackerCreateSchema = z.object({
  thingsToSpend: z.string(),
  money: z.string(),
  category: z.string().optional(),
  paidBy: z.string().datetime(),
  paid: z.boolean(),
})

export const budgetTrackerUpdateSchema = z.object({
  id: z.string().uuid(),
  thingsToSpend: z.string().optional(),
  money: z.string().optional(),
  category: z.string().optional(),
  paidBy: z.string().datetime().optional(),
  paid: z.boolean().optional(),
})

// Types
export type BudgetTrackerCreateType = z.infer<typeof budgetTrackerCreateSchema>
export type BudgetTrackerUpdateType = z.infer<typeof budgetTrackerUpdateSchema>
