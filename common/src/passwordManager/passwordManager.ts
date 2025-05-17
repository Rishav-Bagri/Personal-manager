import { z } from "zod"

export const PM_CreateSchema = z.object({
  userName: z.string().min(1),
  domain: z.string().min(1),
  password: z.string().min(1),
  notes: z.string().optional(),
})

export const PM_GetDomainsSchema = z.object({
  userName: z.string().min(1),
})

export const PM_GetPasswordById = z.object({
  userName: z.string().min(1),
  id: z.string().uuid(),
})

export const PM_UpdateSchema = z.object({
  id: z.string().uuid(),
  password: z.string().min(1),
  notes: z.string().optional(),
})

export const PM_DeleteSchema = z.object({
  id: z.string().uuid(),
})

// Types
export type PM_CreateInput = z.infer<typeof PM_CreateSchema>
export type PM_GetDomainsInput = z.infer<typeof PM_GetDomainsSchema>
export type PM_GetPasswordById = z.infer<typeof PM_GetPasswordById>
export type PM_UpdateInput = z.infer<typeof PM_UpdateSchema>
export type PM_DeleteInput = z.infer<typeof PM_DeleteSchema>
