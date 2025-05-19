import { PrismaClient } from '@prisma/client/edge';
import { Hono } from 'hono'
import { ENV } from './features/envtype';
import { withAccelerate } from '@prisma/extension-accelerate';
import { UserCreateSchema, UserLoginSchema } from 'daddys-personal-manager';
import { sign } from 'hono/jwt';

const userRouter = new Hono<ENV>()

userRouter.post("/signin",async(c)=>{
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
    
        const data= await c.req.json();
    
        const {success}=UserLoginSchema.safeParse(data)
        if (!success) {
            return c.json({ message: "invalid email or password format" }, 400)
        }

        const user = await prisma.user.findUnique({
            where: { email: data.email },
        })

        if (!user || user.password !== data.password) {
            return c.json({ message: "invalid credentials" }, 401)
        }

        const token=await sign({id:user.id,userName:user.userName},c.env.JWT_SECRET)
        return c.json({
            message:"signin succesful",
            token:token,
            userName:user.userName
        })  

    
    } catch (e) {
        return c.text("Error while creating task "+e, 500)
    }
})
userRouter.post("/signup",async(c)=>{
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())
    
        const data= await c.req.json();
    
        const {success}=UserCreateSchema.safeParse(data)
        if(!success){
            return c.json({
                message:"bad user input",
            })
        }
        const response=await prisma.user.create({
            data:data,
        })
        const token=await sign({id:response.id,userName:response.userName},c.env.JWT_SECRET)
        return c.json({
            message:"signup succesful",
            token:token
        })  
    } catch (e) {
        return c.text("Error while creating task "+e, 500)
    }
})

export default userRouter
