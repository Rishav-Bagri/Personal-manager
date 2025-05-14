import { Hono } from 'hono'

//DB - title plan beforeDoneDate

const bucketListRouter = new Hono()
bucketListRouter.get("/bucketlist",(c)=>{
    return c.text("get bucketlist")
})
bucketListRouter.post("/task",(c)=>{
    return c.text("post  bucketlist")
})
bucketListRouter.put("/update",(c)=>{
    return c.text("update bucketlist")
})
export default bucketListRouter
