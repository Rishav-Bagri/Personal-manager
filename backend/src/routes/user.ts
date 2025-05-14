import { Hono } from 'hono'

const userRouter = new Hono()

userRouter.post("/signin",(c)=>{
    return c.text("signin")
})
userRouter.post("/signup",(c)=>{
    return c.text("signup")
})

export default userRouter
