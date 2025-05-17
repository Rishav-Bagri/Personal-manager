import { z } from "zod"

export const ReminderCreateSchema = z.object({
  userName: z.string().min(1),
  title: z.string().min(1),
  time: z.string().datetime()
})

export const ReminderDeleteSchema = z.object({
  id: z.string().uuid()
})

export const ReminderListSchema = z.object({
  userName: z.string().min(1),
})

export type ReminderCreateInput = z.infer<typeof ReminderCreateSchema>
export type ReminderDeleteInput = z.infer<typeof ReminderDeleteSchema>
export type ReminderListInput = z.infer<typeof ReminderListSchema>
