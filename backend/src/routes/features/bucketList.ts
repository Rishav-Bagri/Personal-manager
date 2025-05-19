import { Hono } from 'hono'
import { ENV } from './envtype'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { bucketListCreateSchema, bucketListUpdateSchema } from 'daddys-personal-manager'

//DB - title plan beforeDoneDate

const bucketListRouter = new Hono<ENV>()
bucketListRouter.get("/bulk", async (c) => {
    try {

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())


        const data = {
            userName: c.get("userName"),
        }
        const tasks = await prisma.bucketList.findMany({
            where: {
                userName: data.userName,
            }
        })
        return c.json(tasks)
    } catch (e) {
        return c.text("error while getting all tasks " + e)
    }
})
bucketListRouter.post("/create", async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        console.log(c.env.DATABASE_URL);

        const rawData = await c.req.json()
        const { success } = bucketListCreateSchema.safeParse(rawData)
        const data = {
            ...rawData,
            userName: c.get("userName"),
        }
        if (!success) {
            return c.json({
                message: "validation failed"
            })
        }
        const response = await prisma.bucketList.create({
            data: data,
        })
        return c.json(response)
    } catch (e) {
        return c.text("Error while creating task " + e, 500)
    }
})
bucketListRouter.put("/update", async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        const rawData = await c.req.json()
        const { success } = bucketListUpdateSchema.safeParse(rawData)
        const data = {
            ...rawData,
            userName: c.get("userName"),
        }
        if (!success) {
            return c.json({
                message: "validation failed"
            })
        }
        const response = await prisma.bucketList.update({
            where: {
                id: data.id
            },
            data: data
        })
        return c.json(response)
    } catch (e) {
        return c.text("Error while updating task", 500)
    }
})
export default bucketListRouter
