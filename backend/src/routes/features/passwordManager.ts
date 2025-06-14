import { Hono } from 'hono'
import { ENV } from './envtype'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { passwordManagerCreateSchema, passwordManagerDeleteSchema, passwordManagerUpdateSchema } from 'daddys-personal-manager'

//DB - domain username pass

const passwordManagerRouter = new Hono<ENV>()
passwordManagerRouter.get("/password/:id", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const userName = c.get("userName")
    const id = c.req.param("id")

    const entry = await prisma.passwordManager.findFirst({
      where: {
        id,
        userName,
      },
    })

    if (!entry) return c.json({ message: "Not found" }, 404)

    return c.json(entry)
  } catch (e) {
    return c.text("error while getting password by id " + e)
  }
})


passwordManagerRouter.post("/domains/create", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const rawData = await c.req.json()
    const { success } = passwordManagerCreateSchema.safeParse(rawData)

    if (!success) {
      return c.json({ message: "validation failed" }, 400)
    }

    const data = {
      ...rawData,
      userName: c.get("userName"),
    }

    const created = await prisma.passwordManager.create({
      data,
    })

    return c.json({ message: "Password domain created", created })
  } catch (e) {
    return c.text("Error while creating password domain: " + e, 500)
  }
})


passwordManagerRouter.delete("/delete", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const rawData = await c.req.json()
    const { success } = passwordManagerDeleteSchema.safeParse(rawData)

    if (!success) {
      return c.json({ message: "validation failed" }, 400)
    }

    const data = {
      ...rawData,
      userName: c.get("userName"),
    }

    const deleted = await prisma.passwordManager.delete({
      where: {
        id: data.id,
      },
    })

    return c.json({ message: "Password entry deleted", deleted })
  } catch (e) {
    return c.text("Error while deleting password: " + e, 500)
  }
})

passwordManagerRouter.get("/domains/bulk", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const userName = c.get("userName")

    const domains = await prisma.passwordManager.findMany({
      where: { userName },
      select: {
        id: true,
        domain: true,
        notes: true,
      },
    })

    return c.json(domains)
  } catch (e) {
    return c.text("Error while getting domains: " + e, 500)
  }
})


passwordManagerRouter.put("/update", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const rawData = await c.req.json()
    const { success } = passwordManagerUpdateSchema.safeParse(rawData)

    if (!success) {
      return c.json({ message: "validation failed" }, 400)
    }

    const data = {
      ...rawData,
      userName: c.get("userName"),
    }

    const updated = await prisma.passwordManager.update({
      where: {
        id: data.id,
      },
      data,
    })

    return c.json({ message: "Password updated", updated })
  } catch (e) {
    return c.text("Error while updating password: " + e, 500)
  }
})

export default passwordManagerRouter
