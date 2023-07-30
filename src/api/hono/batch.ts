import { Context, Hono } from 'hono';
import * as Batch from '../../domain/Batch';
import { parseBatch, parseOrderLine } from '../../typia';
import FakeBatchUnitOfWork from '../../persistence/FakeBatchUnitOfWork';
import FakeBatchRepo from '../../persistence/FakeBatchRepo';
import { allocate } from '../../service/BatchServices';

const batchRouter = new Hono()

const repo = FakeBatchRepo()

batchRouter.get('/', async () => {
	const batchList = await repo.list();
	return Response.json({ batchList }, 200)
})

batchRouter.post('/', async (c) => {
	const text = await c.req.text();
	const batch = parseBatch(text);

	await repo.add({
		...batch,
		eta: batch.eta !== null ? new Date(batch.eta) : null
	})
	
	return Response.json({ batchId: batch.id }, 201)
})

batchRouter.post('/allocate', async (c) => {
	const text = await c.req.text();
	const line = parseOrderLine(text);

	const uow = FakeBatchUnitOfWork(repo)
	const batchId = await allocate(line, uow);
	
	return Response.json({ batchId }, 201)
})

export default batchRouter;