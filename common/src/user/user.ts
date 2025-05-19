import { z } from 'zod'

export const UserCreateSchema = z.object({
  name: z.string(),
  userName: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

export const UserLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const UserUpdateSchema = z.object({
  id: z.string().uuid(),
  name: z.string().optional(),
  userName: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().min(6).optional(),
})

// infer types
export type UserCreateType = z.infer<typeof UserCreateSchema>
export type UserLoginType = z.infer<typeof UserLoginSchema>
export type UserUpdateType = z.infer<typeof UserUpdateSchema>
