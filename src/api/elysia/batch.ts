import { Elysia, t } from 'elysia';
import FakeBatchUnitOfWork from '../../persistence/FakeBatchUnitOfWork';
import * as batchServices from '../../service/BatchServices';
import FakeBatchRepo from '../../persistence/FakeBatchRepo';
import { batchDto, orderLineDto } from '../../schema/typebox/batch';

const repo = FakeBatchRepo()


const createBatchGroup = (app: Elysia) =>
	app.get('', async () => {
		const batchList = await repo.list();
		return { batchList }
	}, {
		response: t.Object({
			batchList: t.Array(batchDto)
		})
	})
		.post('', async ({ body }) => {
			const batch = body

			await repo.add(batch)

			return { batchId: batch.id }
		}, {
			body: batchDto,
			response: t.Object({
				batchId: batchDto.properties.id
			})
		})
		.post('/allocate', async ({ body }) => {
			const line = body;

			const uow = FakeBatchUnitOfWork(repo)
			const batchId = await batchServices.allocate(line, uow);

			return { batchId }
		}, {
			body: orderLineDto,
			response: t.Object({
				batchId: batchDto.properties.id
			})
		})
		.get('/allocations/:orderId', async ({ params: { orderId } }) => {
			const batch = await repo.findBatchForOrderLine(orderId);
			return { batch }
		}, {
			params: t.Object({ orderId: t.String() }),
			response: t.Object({ batch: batchDto })
		})

export default createBatchGroup;