import { Elysia, t } from 'elysia';
import { allocate } from '../../domain/allocations';
import * as Batch from '../../domain/Batch';
import { parseOrderLine } from '../../typia';

let batchList: Batch.T[] = [{
	id: 'batch-001',
	sku: 'SMALL-TABLE',
	quantity: 10,
	allocations: [],
	eta: null
}]

const createBatchGroup = (app: Elysia) => 
	app.get('/', async () => {
		return batchList
	})
	.post('/allocate', async ({ body }) => {
		const line = parseOrderLine(body as string)

		const allocatedBatch = allocate(line, batchList)

		batchList = batchList.map(batch => batch.id === allocatedBatch.id ? allocatedBatch : batch);

		return { batchId: allocatedBatch.id }
	})

export default createBatchGroup;