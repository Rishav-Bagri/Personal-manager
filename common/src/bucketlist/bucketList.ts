import { z } from "zod"

// Schemas
export const bucketListCreateSchema = z.object({
  title: z.string(),
  plan: z.string(),
  doneBy: z.string().datetime().optional(),
})

export const bucketListUpdateSchema = z.object({
  id: z.string().uuid(),
  title: z.string().optional(),
  plan: z.string().optional(),
  doneBy: z.string().datetime().optional(),
  isDone: z.boolean().optional(),
})

// Types
export type BucketListCreateType = z.infer<typeof bucketListCreateSchema>
export type BucketListUpdateType = z.infer<typeof bucketListUpdateSchema>
