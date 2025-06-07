import { z } from "zod"

export const ReminderCreateSchema = z.object({
  title: z.string().min(1),
  time: z.string().datetime(),
})

export const ReminderDeleteSchema = z.object({
  id: z.string().uuid(),
})

export type ReminderCreateInput = z.infer<typeof ReminderCreateSchema>
export type ReminderDeleteInput = z.infer<typeof ReminderDeleteSchema>

export type ReminderType = {
  id: string
  title: string
  time: string
}
