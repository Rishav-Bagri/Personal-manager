import { Hono } from 'hono'

//DB - domain username pass

const passwordManagerRouter = new Hono()
passwordManagerRouter.get("/get-password",(c)=>{
    return c.text("get password")
})
passwordManagerRouter.post("/domains",(c)=>{
    return c.text("post  domain")
})
passwordManagerRouter.delete("/delete-password",(c)=>{
    return c.text("password deleted")
})
passwordManagerRouter.get("/domains",(c)=>{
    return c.text("domains get")
})
passwordManagerRouter.put("/update",(c)=>{
    return c.text("update")
})
export default passwordManagerRouter
