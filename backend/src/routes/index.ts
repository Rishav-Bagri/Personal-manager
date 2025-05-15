import { Hono } from 'hono'
import userRouter from './user'
import passwordManagerRouter from './features/passwordManager'
import reminderRouter from './features/reminders'
import bucketListRouter from './features/bucketList'
import budgetRouter from './features/budgetTracker'
import taskRouter from './features/task'

const mainRouter = new Hono()


mainRouter.route("/user",userRouter)
mainRouter.route("/password-manager",passwordManagerRouter)
mainRouter.route("/reminder",reminderRouter)
mainRouter.route("/bucket-list",bucketListRouter)
mainRouter.route("/budget",budgetRouter)
mainRouter.route("/task",taskRouter)
export default mainRouter
