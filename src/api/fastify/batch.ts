import { allocate } from '../../domain/allocations';
import * as Batch from '../../domain/Batch';
import { parseOrderLine } from '../../typia';
import { FastifyInstance } from 'fastify';


let batchList: Batch.T[] = [{
	id: 'batch-001',
	sku: 'SMALL-TABLE',
	quantity: 10,
	allocations: [],
	eta: null
}]

export default function (fastify: FastifyInstance, _options: unknown, done: () => void) {
    fastify.get('/', async () => {
        return { batchList }
    })
    
    fastify.post('/allocate', async (request) => {
        const line = parseOrderLine(request.body);
    
        const allocatedBatch = allocate(line, batchList)
        
        batchList = batchList.map(batch => batch.id === allocatedBatch.id ? allocatedBatch : batch);
    
        return { batchId: allocatedBatch.id }
    })
    done()
  };