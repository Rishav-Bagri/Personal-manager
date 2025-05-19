import { Hono } from 'hono'
import { date } from 'zod'
import { TaskCreateSchema, TaskDeleteSchema, TaskListSchema, TaskUpdateSchema } from 'daddys-personal-manager'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { ENV } from './envtype'

//DB - title desc done

const taskRouter = new Hono<ENV>()

taskRouter.get("/bulk",async(c)=>{
    try{
        
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        
        const rawData = await c.req.json()
        const data = {
            ...rawData,
            userName: c.get("userName"),
        }

        const {success}=TaskListSchema.safeParse(data)
        if(!success){
            return c.json({
                message:"validation failed"
            })
        }
        console.log("hi");
        const tasks=await prisma.task.findMany({
            where:{
                userName:data.userName,
            }
        })
        return c.json(tasks)
    }catch(e){
        return c.text("error while getting all tasks "+e)
    }
})
taskRouter.post("/create",async(c)=>{
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
        console.log(c.env.DATABASE_URL);

        const rawData = await c.req.json()
        const data = {
            ...rawData,
            userName: c.get("userName"),
        }
        const {success}=TaskCreateSchema.safeParse(data)
        if(!success){
            return c.json({
                message:"validation failed"
            })
        }
        const response=await prisma.task.create({
            data:data,
        })
        return c.json(response)
    } catch (e) {
        return c.text("Error while creating task "+e, 500)
    }
})

taskRouter.put("/update",async(c)=>{
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        const rawData = await c.req.json()
        const data = {
            ...rawData,
            userName: c.get("userName"),
        }
        const {success}=TaskUpdateSchema.safeParse(data)
        if(!success){
            return c.json({
                message:"validation failed"
            })
        }
        const response=await prisma.task.update({
            where:{
                id:data.id
            },
            data:data
        })
        return c.json(response)
    } catch (e) {
        return c.text("Error while updating task", 500)
    }
})
taskRouter.delete("/delete",async(c)=>{
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        const rawData = await c.req.json()
            const data = {
            ...rawData,
            userName: c.get("userName"),
        }
        const {success}=TaskDeleteSchema.safeParse(data)
        if(!success){
            return c.json({
                message:"validation failed"
            })
        }
        const response=await prisma.task.delete({
            where:{
                id:data.id
            }
        })
        return c.json(response)
    } catch (e) {
        return c.text("Error while deleting task", 500)
    }
})
export default taskRouter
