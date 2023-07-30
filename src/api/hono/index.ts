import { Hono } from 'hono'
import { logger } from 'hono/logger'
import batchRouter from './batch'

const app = new Hono()

app.use('*', logger())
app.route('/batch', batchRouter)
app.onError((error, c) => {
    if (error instanceof Error) {
        return Response.json({ error: error.message }, 400)
    }

    return Response.json({ error: '알 수 없는 에러' }, 400)
  })
export default app