import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { ReminderCreateSchema, ReminderDeleteSchema } from 'daddys-personal-manager'
import { ENV } from './envtype'

const reminderRouter = new Hono<ENV>()

// Get all reminders for logged-in user
reminderRouter.get("/reminder", async c => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const userName = c.get("userName")

    const reminders = await prisma.reminder.findMany({
      where: { userName },
    })

    return c.json(reminders)
  } catch (e) {
    return c.text("Error fetching reminders: " + e, 500)
  }
})

// Create a new reminder
reminderRouter.post("/reminder", async c => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const rawData = await c.req.json()
    const result = ReminderCreateSchema.safeParse(rawData)

    if (!result.success) {
      return c.json({ message: "Validation failed" }, 400)
    }

    const data = {
      ...result.data,
      userName: c.get("userName"),
      time: new Date(result.data.time), // parse ISO string
    }

    const created = await prisma.reminder.create({ data })

    return c.json({ message: "Reminder created", created })
  } catch (e) {
    return c.text("Error creating reminder: " + e, 500)
  }
})

// Delete a reminder
reminderRouter.delete("/reminder", async c => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const rawData = await c.req.json()
    const result = ReminderDeleteSchema.safeParse(rawData)

    if (!result.success) {
      return c.json({ message: "Validation failed" }, 400)
    }

    const deleted = await prisma.reminder.delete({
      where: { id: result.data.id },
    })

    return c.json({ message: "Reminder deleted", deleted })
  } catch (e) {
    return c.text("Error deleting reminder: " + e, 500)
  }
})

export default reminderRouter
