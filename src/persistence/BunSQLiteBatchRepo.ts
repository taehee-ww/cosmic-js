import { Database } from "bun:sqlite";

import * as Batch from '../domain/Batch';
import { BatchRepo } from './types';
import { assertBatch } from '../typia';

function groupBy<Item>(array: Item[], by: (item: Item) => string | number): Map<string | number, Item[]> {
    const result = new Map();
    for (const item of array){
        const key = by(item)
        if (result.has(key)) {
            result.get(key).push(item)
        } else {
            result.set(key, [item])
        }
    }
    return result;
}

function BunSqliteBatchRepo(db: Database): BatchRepo {
    const getQuery = db.prepare('SELECT b.id as batch_id, b.sku as sku, b.quantity, b.eta, o.order_id as order_id, o.quantity as line_quantity FROM batches as b JOIN order_lines as o ON o.batch_id = b.id WHERE id = $batchId ')
    const allQuery = db.prepare('SELECT b.id as batch_id, b.sku as sku, b.quantity, b.eta, o.order_id as order_id, o.quantity as line_quantity FROM batches as b JOIN order_lines as o ON o.batch_id = b.id')
    const insertBatch = db.prepare('INSERT INTO batches (id, sku, quantity, eta) VALUES ($id, $sku, $quantity, $eta)')
    const insertOrderLine = db.prepare('INSERT INTO order_lines (order_id, sku, quantity, batch_id) VALUES ($orderId, $sku, $quantity, $batch_id)')
    const createBatch = db.transaction((batch: Batch.T) => {
        insertBatch.run({
           $id: batch.id,
            $sku: batch.sku,
            $quantity: batch.quantity,
            $eta: batch.eta ? batch.eta : null
        })
        for (const line of batch.allocations) insertOrderLine.run({ $orderId: line.orderId, $sku: line.sku, $quantity: line.quantity, $batch_id: batch.id });
    });
    return {
        async add(batch: Batch.T){
             createBatch(batch)
        },
        async get(batchId: string) {
            const rows = getQuery.all({$batchId: batchId}) as any[];
            if (rows.length === 0){
                throw Error('does not exist')
            }

            const first = rows[0];
            const batch = {
                id: batchId,
                sku: first.sku,
                quantity: first.quantity,
	            eta: first.eta ? first.eta : null,
	            allocations: rows.map(item => ({
                    orderId: item.order_id,
                    sku: first.sku,
                    quantity: item.line_quantity
                }))
            }
            return assertBatch(batch);
        },
        async list(){
            const result = allQuery.all() as any[];

            return [...groupBy(result, (item) => item.batch_id).values()].map(rows => {

                const first = rows[0];
                const batch = {
                    id: first.batch_id,
                    sku: first.sku,
                    quantity: first.quantity,
                    eta: first.eta ? first.eta : null,
                    allocations: rows.map(item => ({
                        orderId: item.order_id,
                        sku: first.sku,
                        quantity: item.line_quantity
                    }))
                }
                return batch;
            })
        }
    }    
}

export default BunSqliteBatchRepo;