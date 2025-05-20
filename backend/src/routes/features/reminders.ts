import { Hono } from 'hono'

//DB - title time

const reminderRouter = new Hono()
reminderRouter.get("/reminder",(c)=>{
    return c.text("get reminder")
})
reminderRouter.post("/reminder",(c)=>{
    return c.text("post reminder")
})

reminderRouter.delete("/reminder",(c)=>{
    return c.text("delete reminder")
})
export default reminderRouter
