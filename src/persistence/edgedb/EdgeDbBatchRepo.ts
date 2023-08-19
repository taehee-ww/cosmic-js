import { Database } from "bun:sqlite";

import * as Batch from '../../domain/Batch';
import { BatchRepo } from '../types';
import { assertBatch } from '../../typia';

function BunSqliteBatchRepo(db: Database): BatchRepo {

    return {
        async add(batch: Batch.T){
        },
        async get(batchId: string) {
            return assertBatch({})
        },
        async list(){
            return []
        }
    }    
}

export default BunSqliteBatchRepo;