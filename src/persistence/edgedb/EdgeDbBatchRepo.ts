import { Database } from "bun:sqlite";

import * as Batch from '../../domain/Batch';
import { BatchRepo } from '../types';
import { assertBatch } from '../../typia';

function EdgeDBBatchRepo(db: Database): BatchRepo {

    return {
        async add(batch: Batch.T){
        },
        async allocate(batchId, line) {
        },
        async get(batchId: string) {
            return assertBatch({})
        },
        async list(){
            return []
        }
    }    
}

export default EdgeDBBatchRepo;