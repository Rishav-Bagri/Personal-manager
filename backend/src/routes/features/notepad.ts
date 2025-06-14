import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { ENV } from './envtype'
import {
  notepadCreateSchema,
  notepadDeleteSchema,
  notepadUpdateSchema
} from 'daddys-personal-manager'

const notepadRouter = new Hono<ENV>()

// 🔹 GET all notes for user
notepadRouter.get('/notepad', async c => {
  try {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate())
    const userName = c.get('userName')

    const notes = await prisma.notepad.findMany({
      where: { userName },
      orderBy: { updatedAt: 'desc' }
    })

    return c.json(notes)
  } catch (e) {
    return c.text('Error fetching notes: ' + e, 500)
  }
})

// 🔹 POST create note
notepadRouter.post('/notepad', async c => {
  try {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate())
    const raw = await c.req.json()
    const parsed = notepadCreateSchema.safeParse(raw)
    if (!parsed.success) return c.json({ message: 'Validation failed' }, 400)

    const data = {
      ...parsed.data,
      userName: c.get('userName')
    }

    const created = await prisma.notepad.create({ data })

    return c.json({ message: 'Note created', created })
  } catch (e) {
    return c.text('Error creating note: ' + e, 500)
  }
})

// 🔹 PUT update note
notepadRouter.put('/notepad', async c => {
  try {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate())
    const raw = await c.req.json()
    const parsed = notepadUpdateSchema.safeParse(raw)
    if (!parsed.success) return c.json({ message: 'Validation failed' }, 400)

    const { id, ...update } = parsed.data

    const updated = await prisma.notepad.update({
      where: { id },
      data: update
    })

    return c.json({ message: 'Note updated', updated })
  } catch (e) {
    return c.text('Error updating note: ' + e, 500)
  }
})

// 🔹 DELETE note
notepadRouter.delete('/notepad', async c => {
  try {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate())
    const raw = await c.req.json()
    const parsed = notepadDeleteSchema.safeParse(raw)
    if (!parsed.success) return c.json({ message: 'Validation failed' }, 400)

    const deleted = await prisma.notepad.delete({
      where: { id: parsed.data.id }
    })

    return c.json({ message: 'Note deleted', deleted })
  } catch (e) {
    return c.text('Error deleting note: ' + e, 500)
  }
})

export default notepadRouter
