import { BatchRepo, BatchUnitOfWork } from './types';

function FakeBatchUnitOfWork(repo: BatchRepo): BatchUnitOfWork {
    let committed = false;

    return {
        repo,
        async commit(){
            committed = true;
        },
        async rollback() {
            if (committed){
                throw Error('already comitted')
            }
        },
    }
    
}

export default FakeBatchUnitOfWork