import * as Batch from './Batch';

export function allocate(line: Batch.OrderLine, batchList: Batch.T[]): Batch.T {
	const batch = batchList.filter(batch => Batch.canAllocate(batch, line)).sort((a,b) => {
		if (a.eta === b.eta){
			return 0;
		}
		if (a.eta === null){
			return -1;
		}
		if (b.eta === null){
			return 1;
		}
		return a.eta > b.eta ? 1 : -1;
	}).at(0)
	if (batch) {
		return Batch.allocate(batch, line)
	}
	
	throw Error('out-of-stock')
}