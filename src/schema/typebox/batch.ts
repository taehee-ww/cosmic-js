import { t } from 'elysia';
import { ORDER_LINE, BATCH } from '../../domain/fixtures';

export const orderLineDto = t.Object({
	orderId: t.String(),
	sku: t.String(),
	quantity: t.Number()
}, {
	examples: [
		ORDER_LINE
	]
})

export const batchDto = t.Object({
	id: t.String({ examples: ['batch-001'] }),
	sku: t.String(),
	quantity: t.Number(),
	eta: t.Union([t.Number(), t.Null()]),
	allocations: t.Array(orderLineDto)
}, {
	examples: [{
		...BATCH,
		allocations: [ORDER_LINE]
	}]
});
