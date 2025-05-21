import { Hono } from 'hono'
import { ENV } from './envtype'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {
  bucketListCreateSchema,
  bucketListUpdateSchema,
  bucketListDeleteSchema,
} from 'daddys-personal-manager'

const bucketListRouter = new Hono<ENV>()

// Get all bucket list items for the user
bucketListRouter.get("/bulk", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const tasks = await prisma.bucketList.findMany({
      where: {
        userName: c.get("userName"),
      },
    })

    return c.json(tasks)
  } catch (e) {
    return c.text("error while getting all tasks " + e)
  }
})

// Create a new bucket list item
bucketListRouter.post("/create", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const rawData = await c.req.json()
    const parsed = bucketListCreateSchema.safeParse(rawData)

    if (!parsed.success) {
      return c.json({ message: "validation failed" }, 400)
    }

    const data = {
      ...parsed.data,
      userName: c.get("userName"),
    }

    const response = await prisma.bucketList.create({ data })
    return c.json(response)
  } catch (e) {
    return c.text("Error while creating task " + e, 500)
  }
})

// Update an existing bucket list item
bucketListRouter.put("/update", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const rawData = await c.req.json()
    const parsed = bucketListUpdateSchema.safeParse(rawData)

    if (!parsed.success) {
      return c.json({ message: "validation failed" }, 400)
    }

    const data = {
      ...parsed.data,
      userName: c.get("userName"),
    }

    const response = await prisma.bucketList.update({
      where: { id: data.id },
      data,
    })

    return c.json(response)
  } catch (e) {
    return c.text("Error while updating task", 500)
  }
})

// Delete a bucket list item
bucketListRouter.delete("/delete", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const rawData = await c.req.json()
    const parsed = bucketListDeleteSchema.safeParse(rawData)

    if (!parsed.success) {
      return c.json({ message: "validation failed" }, 400)
    }

    const response = await prisma.bucketList.delete({
      where: { id: parsed.data.id },
    })

    return c.json({ message: "Deleted successfully", data: response })
  } catch (e) {
    return c.text("Error while deleting task " + e, 500)
  }
})

export default bucketListRouter
