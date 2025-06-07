import { Hono } from 'hono'
import userRouter from './user'
import passwordManagerRouter from './features/passwordManager'
import reminderRouter from './features/reminders'
import bucketListRouter from './features/bucketList'
import budgetRouter from './features/budgetTracker'
import taskRouter from './features/task'
import { verify } from 'hono/jwt'
import { ENV } from './features/envtype'
import notepadRouter from './features/notepad'

const mainRouter = new Hono<ENV>()

mainRouter.route("/user", userRouter)
mainRouter.use("/*", async (c, next) => {

    const header = c.req.header("authorization") || ""
    const token = header.split(" ")[1]
    console.log(header);

    if (!token || !header.startsWith("Bearer ")) {
        c.status(403)
        return c.json({ error: "unauthorized - missing token" })
    }

    try {
        const payload = await verify(token, c.env.JWT_SECRET) as { id?: string, userName?: string }

        if (!payload?.userName) {
            c.status(403)
            return c.json({ error: "unauthorized - invalid token" + payload.userName })
        }

        c.set("userName", payload.userName) // attach to context
        await next()

    } catch (err) {
        c.status(403)
        return c.json({ error: "unauthorized - token error" })
    }
})
mainRouter.route("/password-manager", passwordManagerRouter)
mainRouter.route("/reminder", reminderRouter)
mainRouter.route("/bucket-list", bucketListRouter)
mainRouter.route("/budget", budgetRouter)
mainRouter.route("/task", taskRouter)
mainRouter.route("/notepad", notepadRouter)
export default mainRouter
