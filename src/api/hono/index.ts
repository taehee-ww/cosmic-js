import { Hono } from 'hono'
import { logger } from 'hono/logger'
import batchRouter from './batch'

const app = new Hono()

app.use('*', logger())
app.route('/batch', batchRouter)

export default app