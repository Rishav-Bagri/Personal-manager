import { z } from "zod"

export const TaskCreateSchema = z.object({
  userName: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  dueDate: z.coerce.date().optional(),
  priority: z.enum(["HIGH", "MEDIUM", "LOW"]).optional(),
})

export const TaskUpdateSchema = z.object({
  id: z.string().uuid(),
  title: z.string().optional(),
  description: z.string().optional(),
  dueDate: z.coerce.date().optional(),
  priority: z.enum(["HIGH", "MEDIUM", "LOW"]).optional(),
  done: z.boolean().optional(),
})

export const TaskDeleteSchema = z.object({
  id: z.string().uuid()
})

export const TaskListSchema = z.object({
  userName: z.string().min(1)
})

// Types from inference
export type TaskCreateType = z.infer<typeof TaskCreateSchema>
export type TaskUpdateType = z.infer<typeof TaskUpdateSchema>
export type TaskDeleteType = z.infer<typeof TaskDeleteSchema>
export type TaskListType = z.infer<typeof TaskListSchema>
