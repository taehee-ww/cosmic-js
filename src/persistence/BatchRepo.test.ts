import Database from 'bun:sqlite';
import { describe, it, expect } from 'bun:test';
import { BatchRepo } from './types';
import DrizzleSqliteBatchRepo from './DrizzleSqliteBatchRepo';

function setupBunSqliteRepo(): BatchRepo {
    const db = new Database(':memory:')

    db.exec('CREATE TABLE IF NOT EXISTS batches (id TEXT NOT NULL, sku TEXT NOT NULL, quantity INTEGER NOT NULL, eta INTEGER)');
    db.exec('CREATE TABLE IF NOT EXISTS order_lines (order_id TEXT NOT NULL, sku TEXT NOT NULL, quantity INTEGER NOT NULL, batch_id INTEGER)');

    const repo = DrizzleSqliteBatchRepo(db);
    return repo;
}

it('test', async () => {
    const repo = setupBunSqliteRepo();

    // expect(await repo.list()).toStrictEqual([]);

    const batch = {
		id: 'batch-001',
		sku: 'SMALL-TABLE',
		quantity: 10,
		allocations: [{
            orderId: 'order-ref',
            sku: 'SMALL-TABLE',
            quantity: 2
        }],
		eta: new Date()
	};
    // await repo.add(batch)
    
    // expect(await repo.list()).toStrictEqual([batch]);
    // expect(await repo.get(batch.id)).toStrictEqual(batch);
})