import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import FakeBatchUnitOfWork from '../../persistence/FakeBatchUnitOfWork';
import FakeBatchRepo from '../../persistence/FakeBatchRepo';
import { allocate } from '../../service/BatchServices';
import { batchSchema, orderLineSchema } from '../../schema/zod/batch';
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { getRoute, postRoute } from './openapiUtils';

const app = new OpenAPIHono()

// app.use('*', logger())
const repo = FakeBatchRepo()

app.openapi(getRoute('/batches', {
	res: z.object({
		batchList: z.array(batchSchema)
	}, {
		description: '모든 Batch 목록'
	})
}), async (c) => {
	const batchList = await repo.list();
	return c.jsonT({ batchList })
})

app.openapi(postRoute('/batches', {
	req: batchSchema,
	res: z.object({
		batchId: batchSchema.shape.id
	}, { description: '추가된 Batch의 id '}),
}), async (c) => {
	const batch = c.req.valid('json')
	await repo.add(batch)

	return c.jsonT({ batchId: batch.id })
})

app.openapi(postRoute('/batches/allocate', {
	req: orderLineSchema,
	res: z.object({
		batchId: batchSchema.shape.id
	}, { description: 'orderLine을 할당한 Batch의 id '}),
}), async (c) => {
	const line = c.req.valid('json')

	const uow = FakeBatchUnitOfWork(repo)
	const batchId = await allocate(line, uow);

	return c.jsonT({ batchId })
})

app.onError((error, c) => {
	if (error instanceof Error) {
		return Response.json({ error: error.message }, { status: 400 })
	}

	return Response.json({ error: '알 수 없는 에러' }, { status: 400 })
})

app.doc('/openapi.json', {
	openapi: '3.0.0',
	info: {
		version: '1.0.0',
		title: 'Allocation api',
	},
})

app.openapi(createRoute({
	method: 'get',
	path: '/redoc',
	responses: {
		200: {
			content: {
				'text/html': {
					schema: z.string()
				},
			},
			description: 'redoc.html',
		},
	}
}),
	async (c) => {
		return await Bun.file('./src/api/fets/redoc.html').text().then(c.html)
	})

app.use('/openapi.json/*', prettyJSON())
export default app