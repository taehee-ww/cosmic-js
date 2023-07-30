import { Elysia, t } from 'elysia';
import { allocate } from '../../domain/allocations';
import * as Batch from '../../domain/Batch';

let batchList: Batch.T[] = [{
	id: 'batch-001',
	sku: 'SMALL-TABLE',
	quantity: 10,
	allocations: [],
	eta: null
}]

const orderLineSchema = t.Object({
	orderId: t.String(),
	sku: t.String(),
	quantity: t.Number()
});

const createBatchGroup = (app: Elysia) => 
	app.get('/', async () => {
		return batchList
	}, {
		response: t.Array(t.Object({
			id: t.String(),
			sku: t.String(),
			quantity: t.Integer({ minimum: 0 }),
			allocations: t.Array(orderLineSchema),
			eta: t.Union([t.Null(), t.Date()]) 
		}))
	})
	.post('/allocate', async ({ body: line }) => {

		const allocatedBatch = allocate(line, batchList)

		batchList = batchList.map(batch => batch.id === allocatedBatch.id ? allocatedBatch : batch);

		return { batchId: allocatedBatch.id }
	}, {
        body: orderLineSchema,
		response: t.Object({ batchId: t.String() })
    })

export default createBatchGroup;