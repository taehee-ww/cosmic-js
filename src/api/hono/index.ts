import { Hono } from 'hono'
import batchRouter from './batch'

const app = new Hono()

app.route('/batch', batchRouter)

export default app