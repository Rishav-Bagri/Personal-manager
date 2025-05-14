import { Hono } from 'hono'

//DB - title time

const reminderRouter = new Hono()
reminderRouter.get("/tasks",(c)=>{
    return c.text("get reminder")
})
reminderRouter.post("/task",(c)=>{
    return c.text("post  reminder")
})

reminderRouter.delete("/delete",(c)=>{
    return c.text("delete reminder")
})
export default reminderRouter
