import * as Batch from '../domain/Batch';
import * as Allocation from '../domain/allocations';
import { BatchUnitOfWork } from '../persistence/types';

function isValidSku(sku: string, batches: Batch.T[]) {
    return batches.some(batch => batch.sku === sku);
}

export async function allocate(line: Batch.OrderLine, uow: BatchUnitOfWork): Promise<string> {
    try {
        const batches = await uow.repo.list()
        if (!isValidSku(line.sku, batches)) {
            throw Error('invalid sku')
        }
        const allocatedBatch = Allocation.allocate(line, batches)
        uow.repo.allocate(allocatedBatch.id, line)
        await uow.commit()
        return allocatedBatch.id
    } catch (error) {
        await uow.rollback();

        if (error instanceof Error) {
            throw Error('transaction failed! \n' + error.message, { cause: error })
        }
        throw Error('transaction failed! \n' + error, { cause: error })
    }
}
