import { Elysia, t } from 'elysia'
import createBatchGroup from './batch'
import swagger from '@elysiajs/swagger'

const app = new Elysia()
	.use(swagger({
		path: '/docs'
	}))
	.get('/', () => 'Hello Elysia')
	.group('/batches', createBatchGroup)
	.get('/redoc', () => Bun.file('./src/api/elysia/redoc.html').text().then(html => new Response(html, {
		headers: {
			'Content-Type': 'text/html'
		}
	})))
	.onError(({ code, error }) => {
        return new Response(`${code}: ${error.toString()}`)
    })

export default app;