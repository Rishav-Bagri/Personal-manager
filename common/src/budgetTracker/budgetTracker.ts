import { z } from "zod"

export const BGT_CreateSchema = z.object({
  userName: z.string(),
  thingsToSpend: z.string(),
  money: z.string(),
  category: z.string().optional(),
  paidBy: z.string().datetime(),
  paid: z.boolean()
})

export const BGT_GetSchema = z.object({
  userName: z.string()
})

export const BGT_UpdateSchema = z.object({
  id: z.string().uuid(),
  thingsToSpend: z.string().optional(),
  money: z.string().optional(),
  category: z.string().optional(),
  paidBy: z.string().datetime().optional(),
  paid: z.boolean().optional()
})

export type BGT_CreateType = z.infer<typeof BGT_CreateSchema>
export type BGT_GetType = z.infer<typeof BGT_GetSchema>
export type BGT_UpdateType = z.infer<typeof BGT_UpdateSchema>
