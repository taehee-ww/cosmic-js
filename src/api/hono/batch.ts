import { Context, Hono } from 'hono';
import { allocate } from '../../domain/allocations';
import * as Batch from '../../domain/Batch';
import { parseOrderLine } from '../../typia';

const batchRouter = new Hono()

let batchList: Batch.T[] = [{
	id: 'batch-001',
	sku: 'SMALL-TABLE',
	quantity: 10,
	allocations: [],
	eta: null
}]

batchRouter.get('/', async () => {
	return Response.json({ batchList }, 200)
})

batchRouter.post('/allocate', async (c) => {
	const text = await c.req.text();
	const line = parseOrderLine(text);

	const allocatedBatch = allocate(line, batchList)
	
	batchList = batchList.map(batch => batch.id === allocatedBatch.id ? allocatedBatch : batch);

	return Response.json({ batchId: allocatedBatch.id }, 201)
})

export default batchRouter;