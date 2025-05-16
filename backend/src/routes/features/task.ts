import { Hono } from 'hono'
import prisma from '../../db/prisma'
import { date } from 'zod'

//DB - title desc done

const taskRouter = new Hono<{
    Bindings:{},
    Variables:{
        userName:string
    }
}>()
taskRouter.get("/tasks",(c)=>{
    try{
        const userName=c.get("userName")
        const tasks=prisma.task.findMany({
            where:{
                userName:userName,
            }
        })
        return c.json(tasks)
    }catch(e){
        return c.text("error while getting all tasks")
    }
})
taskRouter.post("/task",async(c)=>{
    try{
        const body=await c.req.json()
        const response= prisma.task.create({
            data:body,
        })
        return c.json(response)
    } catch (e) {
        return c.text("Error while creating task", 500)
    }
})

taskRouter.put("/update",async(c)=>{
    try{
        const body=await c.req.json()
        const response= prisma.task.update({
            where:{
                id:body.id
            },
            data:body
        })
        return c.json(response)
    } catch (e) {
        return c.text("Error while updating task", 500)
    }
})
taskRouter.delete("/delete",async(c)=>{
    try{
        const body=await c.req.json()
        const response= prisma.task.delete({
            where:{
                id:body.id
            }
        })
        return c.json(response)
    } catch (e) {
        return c.text("Error while deleting task", 500)
    }
})
export default taskRouter
