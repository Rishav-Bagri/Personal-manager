import { z } from "zod"

// Schemas
export const passwordManagerCreateSchema = z.object({
  domain: z.string().min(1),
  password: z.string().min(1),
  notes: z.string().optional(),
})

export const passwordManagerGetPasswordByIdSchema = z.object({
  id: z.string().uuid(),
})

export const passwordManagerUpdateSchema = z.object({
  id: z.string().uuid(),
  password: z.string().min(1),
  notes: z.string().optional(),
})

export const passwordManagerDeleteSchema = z.object({
  id: z.string().uuid(),
})

export const passwordManagerBulkSchema = z.object({
  id: z.string().uuid(),
  userName: z.string(),
  domain: z.string(),
  notes: z.string().optional(),
})

// Types

export type PasswordManagerType = z.infer<typeof passwordManagerBulkSchema>
export type PasswordManagerCreateInput = z.infer<typeof passwordManagerCreateSchema>
export type PasswordManagerGetPasswordByIdInput = z.infer<typeof passwordManagerGetPasswordByIdSchema>
export type PasswordManagerUpdateInput = z.infer<typeof passwordManagerUpdateSchema>
export type PasswordManagerDeleteInput = z.infer<typeof passwordManagerDeleteSchema>
