import { z } from "zod"

export const BKT_CreateSchema = z.object({
  userName: z.string(),
  title: z.string(),
  plan: z.string(),
  doneBy: z.string().datetime().optional()
})

export const BKT_GetSchema = z.object({
  userName: z.string()
})

export const BKT_UpdateSchema = z.object({
  id: z.string().uuid(),
  title: z.string().optional(),
  plan: z.string().optional(),
  doneBy: z.string().datetime().optional(),
  isDone: z.boolean().optional()
})

export type BKT_CreateType = z.infer<typeof BKT_CreateSchema>
export type BKT_GetType = z.infer<typeof BKT_GetSchema>
export type BKT_UpdateType = z.infer<typeof BKT_UpdateSchema>
