import { z } from "zod"

// Create Schema
export const TaskCreateSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  dueDate: z.coerce.date().optional(),
  priority: z.enum(["HIGH", "MEDIUM", "LOW"]).optional(),
})

// Update Schema
export const TaskUpdateSchema = z.object({
  id: z.string().uuid(),
  title: z.string().optional(),
  description: z.string().optional(),
  dueDate: z.coerce.date().optional(),
  priority: z.enum(["HIGH", "MEDIUM", "LOW"]).optional(),
  done: z.boolean().optional(),
})

// Delete Schema
export const TaskDeleteSchema = z.object({
  id: z.string().uuid(),
})

// Bulk Read Schema (single item)
export const TaskBulkSchema = z.object({
  id: z.string().uuid(),
  userName: z.string(),
  title: z.string(),
  description: z.string(),
  done: z.boolean(),
  dueDate: z.string().datetime().nullable(),
  priority: z.enum(["HIGH", "MEDIUM", "LOW"]).nullable(),
})

// Types
export type TaskCreateType = z.infer<typeof TaskCreateSchema>
export type TaskUpdateType = z.infer<typeof TaskUpdateSchema>
export type TaskDeleteType = z.infer<typeof TaskDeleteSchema>
export type TaskType = z.infer<typeof TaskBulkSchema>
