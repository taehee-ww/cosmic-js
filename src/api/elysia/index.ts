import { Elysia } from 'elysia'
import createBatchGroup from './batch'
import swagger from '@elysiajs/swagger'

const app = new Elysia()
	.use(swagger())
	.get('/', () => 'Hello Elysia')
	.group('/batch', createBatchGroup)
	.listen(8080)


console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`)