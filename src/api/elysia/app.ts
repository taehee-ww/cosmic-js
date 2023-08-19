import { Elysia, t } from 'elysia'
import createBatchGroup from './batch'
import swagger from '@elysiajs/swagger'

const app = new Elysia()
	.use(swagger())
	.get('/', () => 'Hello Elysia')
	.group('/batches', createBatchGroup)
	.onError(({ code, error }) => {
        return new Response(`${code}: ${error.toString()}`)
    })

export default app;