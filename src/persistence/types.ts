import * as Batch from '../domain/Batch'

export interface BatchRepo {
    add(batch: Batch.T): Promise<void>

    get(id: Batch.T['id']): Promise<Batch.T>

    list(): Promise<Batch.T[]>
}

export interface BatchUnitOfWork {
    repo: BatchRepo
    commit(): Promise<void>  
    rollback(): Promise<void>
}
