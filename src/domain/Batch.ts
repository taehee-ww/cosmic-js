// 묶음 batch
// 주문 품목 orderLine
// 재고 available quantity
export type T = {
	id: string,
	sku: string,
	quantity: number,
	eta: Date | null, // null이면 이미 도착한 상품
	allocations: OrderLine[]
}

export type OrderLine = {
	orderId: string,
	sku: string,
	quantity: number
}

function sum(iterable: Iterable<number>): number {
	let result =0;
	for (const n of iterable){
		result += n;
	}
	return result;
}

export function availableQuantity(batch: T){
	return batch.quantity - allocatedQuantity(batch);
}

export function allocatedQuantity(batch: T){
	return sum(batch.allocations.map(line => line.quantity))
}

export function alreadyAllocated(batch: T, line: OrderLine): boolean {
	if (batch.allocations.some(item => item.orderId === line.orderId)){
		return true
	}
	return false;
}

export function canAllocate(batch: T, line: OrderLine): 'invalid-sku' | 'already-allocated' | 'out-of-stock' | 'ok' {
	if (batch.sku !== line.sku){
		return 'invalid-sku'
	}

	if (alreadyAllocated(batch, line)) {
		return  'already-allocated';
	}

	if (availableQuantity(batch) < line.quantity){
		return 'out-of-stock' 
	}

	return 'ok';
}

export function allocate(batch: T, line: OrderLine):  {
    allocations: OrderLine[];
    id: string;
    sku: string;
    quantity: number;
    eta: Date | null;
}{
	const status = canAllocate(batch, line) ;
	if (status !== 'ok'){
		throw Error(status)
	}

	return {
		...batch,
		allocations: batch.allocations.concat([line])
	}
}

export function deallocate(batch: T, line: OrderLine){
	return {
		isSuccess: false
	};
}