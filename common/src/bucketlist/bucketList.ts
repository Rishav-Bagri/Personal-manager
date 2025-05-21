import { z } from "zod"

// Create Schema
export const bucketListCreateSchema = z.object({
  title: z.string(),
  plan: z.string(),
  doneBy: z.string().datetime().optional(),
})

// Update Schema
export const bucketListUpdateSchema = z.object({
  id: z.string().uuid(),
  title: z.string().optional(),
  plan: z.string().optional(),
  doneBy: z.string().datetime().optional(),
  isDone: z.boolean().optional(),
})

// Delete Schema
export const bucketListDeleteSchema = z.object({
  id: z.string().uuid(),
})

// Bulk Read Schema (for list of items)
export const bucketListBulkSchema = z.object({
  id: z.string().uuid(),
  userName: z.string(),
  title: z.string(),
  plan: z.string(),
  createdAt: z.string().datetime(),
  doneBy: z.string().datetime().nullable(),
  isDone: z.boolean(),
})

// Types
export type BucketListCreateType = z.infer<typeof bucketListCreateSchema>
export type BucketListUpdateType = z.infer<typeof bucketListUpdateSchema>
export type BucketListDeleteType = z.infer<typeof bucketListDeleteSchema>
export type BucketListType = z.infer<typeof bucketListBulkSchema>
