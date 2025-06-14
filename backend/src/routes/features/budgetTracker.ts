import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { ENV } from './envtype'
import {
  budgetTrackerCreateSchema,
  budgetTrackerUpdateSchema
} from 'daddys-personal-manager'

const budgetRouter = new Hono<ENV>()

// 🔹 GET all budget entries for a user
budgetRouter.get('/budget', async (c) => {
  try {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate())
    const userName = c.get('userName')

    const entries = await prisma.budgetTracker.findMany({
      where: { userName },
      orderBy: { paidBy: 'desc' }
    })

    return c.json(entries)
  } catch (e) {
    return c.text('Error fetching budget entries: ' + e, 500)
  }
})

// 🔹 POST create new budget entry
budgetRouter.post('/budget', async (c) => {
  try {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate())
    const raw = await c.req.json()
    const parsed = budgetTrackerCreateSchema.safeParse(raw)

    if (!parsed.success) return c.json({ message: 'Validation failed' }, 400)

    const data = {
      ...parsed.data,
      userName: c.get('userName')
    }

    const created = await prisma.budgetTracker.create({ data })

    return c.json({ message: 'Budget entry created', created })
  } catch (e) {
    return c.text('Error creating budget entry: ' + e, 500)
  }
})

// 🔹 PUT update budget entry by ID
budgetRouter.put('/update', async (c) => {
  try {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate())
    const raw = await c.req.json()
    const parsed = budgetTrackerUpdateSchema.safeParse(raw)

    if (!parsed.success) return c.json({ message: 'Validation failed' }, 400)

    const { id, ...updateData } = parsed.data

    const updated = await prisma.budgetTracker.update({
      where: { id },
      data: updateData
    })

    return c.json({ message: 'Budget entry updated', updated })
  } catch (e) {
    return c.text('Error updating budget entry: ' + e, 500)
  }
})

export default budgetRouter
