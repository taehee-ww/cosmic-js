import * as Batch from '../domain/Batch';
import { BatchRepo } from './types';

function FakeBatchRepo(): BatchRepo {
    let _batches: Batch.T[] = [];

    return {
        async add(batch: Batch.T){
            if (_batches.some(item => item.id === batch.id)){
                throw Error('already exist')
            }

            _batches = [..._batches, batch]
        },
        async get(batchId: string) {
            const batch = _batches.find(item => item.id === batchId);
            if (batch === undefined){
                throw Error('does not exist')
            }
            return batch;
        },
        async list(){
            return _batches;
        }
    }    
}

export default FakeBatchRepo;