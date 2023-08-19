import { z } from '@hono/zod-openapi'

export const orderLineSchema = z.object({
    orderId: z.string(),
    sku: z.string(),
    quantity: z.number()
})
.openapi({
    example:  {
        orderId: 'order-ref',
        sku: 'SMALL-TABLE',
        quantity: 2
      }
});

export const batchSchema = z.object({
    id: z.string().openapi({ example: 'batch-001' }),
    sku: z.string(),
    quantity: z.number(),
    eta: z.number().nullable(),
    allocations: z.array(
        orderLineSchema
    )
}).openapi({ example: {
	id: 'batch-001',
	sku: 'SMALL-TABLE',
	quantity: 10,
	allocations: [{
        orderId: 'order-ref',
        sku: 'SMALL-TABLE',
        quantity: 2
      }],
	eta: null
} })
