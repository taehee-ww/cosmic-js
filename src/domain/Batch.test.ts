import { describe, it, expect } from 'bun:test';
import * as Batch from './Batch';

function setupBatchAndLine(sku: string, batchQuantity: number, lineQuantity: number) {
	const batch: Batch.T = {
		id: 'batch-001',
		sku,
		quantity: batchQuantity,
		allocations: [],
		eta: new Date()
	}
	const line: Batch.OrderLine = {
		orderId: 'order-ref',
		sku: sku,
		quantity: lineQuantity
	}
	return { batch, line };
}


describe('allocate', () => {
	it('묶음에 주문 품목을 할당하면, 재고가 줄어든다', async () => {
		const { batch, line } = setupBatchAndLine('SMALL-TABLE', 20, 2);
	
		const newBatch = Batch.allocate(batch, line)
	
		expect(Batch.availableQuantity(newBatch)).toBe(18)
	})

	it('같은 주문 품목을 두 번 할당해도 멱등성이 유지된다', async () => {
		const { batch, line } = setupBatchAndLine('SMALL-TABLE', 20, 2);
		const newBatch = Batch.allocate(batch, line)
		expect(() => Batch.allocate(newBatch, line)).toThrow('already-allocated')
	})
	
})
describe('canAllocate', () => {

	it('주문량보다 재고가 더 많으면, 할당할 수 있다', () => {
		const { batch, line } = setupBatchAndLine('SMALL-TABLE', 20, 2);

		const result = Batch.canAllocate(batch, line)

		expect(result).toBe('ok')
	})

	it('주문량보다 재고가 부족하면 할당에 실패한다', () => {
		const { batch, line } = setupBatchAndLine('SMALL-TABLE', 10, 20);

		const result = Batch.canAllocate(batch, line)

		expect(result).toBe('out-of-stock')
	})


	it('주문량과 재고가 같으면 할당할 수 있다', () => {
		const { batch, line } = setupBatchAndLine('SMALL-TABLE', 10, 10);

		const result = Batch.canAllocate(batch, line)

		expect(result).toBe('ok')
	})

	it('품목이 다르면 할당할 수 없다', () => {
		const result = Batch.canAllocate({
			id: 'batch-001',
			sku: 'SMALL-TABLE',
			quantity: 10,
			allocations: [],
			eta: new Date()
		}, {
			orderId: 'order-ref',
			sku: 'BIG-TOASTER',
			quantity: 2
		})

		expect(result).toBe('invalid-sku')
	})
})

it('할당하지 않은 주문 품목은 취소할 수 없다', () => {
	const result = Batch.deallocate({
		id: 'batch-001',
		sku: 'SMALL-TABLE',
		quantity: 10,
		allocations: [],
		eta: new Date()
	}, {
		orderId: 'order-ref',
		sku: 'BIG-TOASTER',
		quantity: 2
	})

	expect(result.isSuccess).toBe(false)
})