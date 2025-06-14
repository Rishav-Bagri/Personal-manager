import { Hono } from 'hono'
import { cors } from 'hono/cors'
import mainRouter from './routes'

const app = new Hono()

// Allow CORS for all origins and all paths
app.use('*', cors())

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/v1', mainRouter)

export default app
