import { Database } from "bun:sqlite";
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
 
import * as Batch from '../domain/Batch';
import { BatchRepo } from './types';
import { drizzle } from 'drizzle-orm/bun-sqlite';
import { eq, placeholder, relations } from 'drizzle-orm';

const batches = sqliteTable('batches', {
    id: text('id').primaryKey(),
    sku: text('sku').notNull(),
    quantity: integer('quantity').notNull(),
    eta: integer('eta', { mode: 'timestamp_ms' })
})

const allocations = relations(batches, ({ many }) => ({
	allocations: many(orderLines),
}));

const orderLines = sqliteTable('order_lines', {
    orderId: text('order_id').primaryKey(),
    sku: text('sku').notNull(),
    quantity: integer('quantity').notNull(),    
    batchId: text('batch_id').notNull().references(() => batches.id),
})

const allocated = relations(orderLines, ({ one }) => ({
	allocated: one(batches, {
		fields: [orderLines.orderId],
		references: [batches.id],
	}),
}));

function DrizzleSqliteBatchRepo(bunDb: Database): BatchRepo {
    const db = drizzle(bunDb, {
        schema: {batches, allocations, orderLines, allocated}
    });
    const preparedInsertBatch = db.insert(batches).values({
        id: placeholder('id'),
        sku: placeholder('sku'),
        quantity: placeholder('quantity'),
        eta: placeholder('eta'),
    })
    const preparedInsertOrderLine = db.insert(orderLines).values({
        orderId: placeholder('orderId'),
        sku: placeholder('sku'),
        quantity: placeholder('quantity'),
        batchId: placeholder('batchId'),
    }).prepare()
    const preparedAll = db.query.batches.prepareFindMany({
        with: {
            allocations: true
        }
    });
    const preparedGet = db.query.batches.prepareFindFirst({
        with: {
            allocations: true
        },
        where: eq(batches.id, placeholder('batchId'))
    });

    return {
        async add(batch: Batch.T){
            preparedInsertBatch.run(batch)
            for (const line of batch.allocations){
                preparedInsertOrderLine.run({
                    ...line,
                    batchId: batch.id
                })
            }
        },
        async get(batchId: string) {
            const batch = preparedGet.execute({ batchId })
            if (batch === undefined){
                throw Error('does not exist')
            }
            return batch;
        },
        async list(){
          return preparedAll.execute();
        }
    }    
}

export default DrizzleSqliteBatchRepo;