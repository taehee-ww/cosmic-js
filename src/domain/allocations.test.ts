import { it, expect } from 'bun:test';
import * as B from './Batch';
import * as Allocations from './allocations';

it('이미 도착한 묶음을 더 선호한다.', async () => {
	const 이미_도착한_묶음: B.T = {
		id: 'batch-001',
		sku: 'SMALL-TABLE',
		quantity: 10,
		allocations: [],
		eta: null
	}
	const 도착_예정_묶음: B.T = {
		id: 'batch-02',
		sku: 'SMALL-TABLE',
		quantity: 10,
		allocations: [],
		eta: new Date(2024, 8 - 1, 1)
	}
	const line = {
		orderId: 'order-ref',
		sku: 'SMALL-TABLE',
		quantity: 2
	}

	const newBatch = Allocations.allocate(line, [이미_도착한_묶음, 도착_예정_묶음])

	expect(B.availableQuantity(newBatch)).toEqual(8)
})


it('재고 없음', async () => {
	const 이미_도착한_묶음: B.T = {
		id: 'batch-001',
		sku: 'SMALL-TABLE',
		quantity: 10,
		allocations: [],
		eta: null
	}
	const line = {
		orderId: 'order-ref',
		sku: 'SMALL-TABLE',
		quantity: 20
	}

	expect(() => Allocations.allocate(line, [이미_도착한_묶음])).toThrow('out-of-stock')
})