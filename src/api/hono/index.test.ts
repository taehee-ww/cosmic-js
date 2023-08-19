
import { it, expect } from 'bun:test';
import app from '.';
import { BATCH, ORDER_LINE } from '../../domain/fixtures';

it('hono 시나리오', async () => {
    const before = await app.request('/batches').then(res => res.json());

    expect(before).toStrictEqual({
        batchList: []
    })

    await app.request('/batches', {
        method: 'post',
        body: JSON.stringify(BATCH)
    }).then(res => res.json());

    const after = await app.request('/batches').then(res => res.json());

    expect(after).toStrictEqual({
        batchList: [BATCH]
    })

    await app.request('/batches/allocate', {
        method: 'post',
        body: JSON.stringify(ORDER_LINE)
    }).then(res => res.json());

    const batch = await app.request('/batches/allocations/'+ORDER_LINE.orderId).then(res => res.json());

    const final = await app.request('/batches').then(res => res.json());

    expect(final).toStrictEqual({
        batchList: [{
            ...BATCH,
            allocations: [ORDER_LINE],
        }]
    })

    expect(batch).toStrictEqual({
        batch: {
            ...BATCH,
            allocations: [ORDER_LINE],
        }
    })
})