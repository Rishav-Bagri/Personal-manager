import { z } from "zod"

export const notepadCreateSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1)
})

export const notepadUpdateSchema = z.object({
  id: z.string().uuid(),
  title: z.string().optional(),
  content: z.string().optional()
})

export const notepadDeleteSchema = z.object({
  id: z.string().uuid()
})

export type NotepadCreateInput = z.infer<typeof notepadCreateSchema>
export type NotepadUpdateInput = z.infer<typeof notepadUpdateSchema>
export type NotepadDeleteInput = z.infer<typeof notepadDeleteSchema>

export type NotepadType = {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}
