import { Hono } from 'hono'

//DB - title desc done

const taskRouter = new Hono()
taskRouter.get("/tasks",(c)=>{
    return c.text("get taks")
})
taskRouter.post("/task",(c)=>{
    return c.text("post  taks")
})
taskRouter.put("/update",(c)=>{
    return c.text("update task")
})
taskRouter.delete("/delete",(c)=>{
    return c.text("delete task")
})
export default taskRouter
