import { Hono } from 'hono'
import userRouter from './user'
import passwordManagerRouter from './features/passwordManager'

const mainRouter = new Hono()


mainRouter.route("/user",userRouter)
mainRouter.route("/password-manager",passwordManagerRouter)
export default mainRouter
