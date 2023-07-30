import { Context, Hono } from 'hono';
import { allocate } from '../../domain/allocations';
import * as Batch from '../../domain/Batch';
import { parseOrderLine } from '../../typia';

const batchRouter = new Hono()

function withCatch(func: (ctx: Context) => Promise<Response>) {
	return (ctx: Context) => func(ctx).catch(error => {
		if (error instanceof Error) {
			return Response.json({ error: error.message }, 400)
		}

		return Response.json({ error: '알 수 없는 에러' }, 400)
	})
}

let batchList: Batch.T[] = [{
	id: 'batch-001',
	sku: 'SMALL-TABLE',
	quantity: 10,
	allocations: [],
	eta: null
}]

batchRouter.get('/', withCatch(async () => {
	return Response.json({ batchList }, 200)
}))

batchRouter.post('/allocate', withCatch(async (c) => {
	const text = await c.req.text();
	const line = parseOrderLine(text);

	const allocatedBatch = allocate(line, batchList)
	
	batchList = batchList.map(batch => batch.id === allocatedBatch.id ? allocatedBatch : batch);

	return Response.json({ batchId: allocatedBatch.id }, 201)
}))

export default batchRouter;