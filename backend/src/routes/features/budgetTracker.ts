import { Hono } from 'hono'

//DB - thingToSpent money date

const budgetRouter = new Hono()
budgetRouter.get("/budget",(c)=>{
    return c.text("get budget")
})
budgetRouter.post("/budget",(c)=>{
    return c.text("post  budget")
})
budgetRouter.put("/update",(c)=>{
    return c.text("update budget")
})
export default budgetRouter
