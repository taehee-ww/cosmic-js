import { z } from '@hono/zod-openapi'
import { BATCH, ORDER_LINE } from '../../domain/fixtures';

export const orderLineSchema = z.object({
    orderId: z.string(),
    sku: z.string(),
    quantity: z.number()
})
    .openapi({
        example: ORDER_LINE
    });

export const batchSchema = z.object({
    id: z.string().openapi({ example: 'batch-001' }),
    sku: z.string(),
    quantity: z.number(),
    eta: z.number().nullable(),
    allocations: z.array(
        orderLineSchema
    )
}).openapi({
    example: {
        ...BATCH,
        allocations: [ORDER_LINE]
    }
})
