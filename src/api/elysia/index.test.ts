
import { it, expect } from 'bun:test';
import app from './app';
import { BATCH, ORDER_LINE } from '../../domain/fixtures';

it('elysia 시나리오', async () => {

    const fetchElysia = (path: string, init?: RequestInit) => app.handle(new Request('http://localhost:3000' + path, init)).then(res => {
        if (!res.ok) {
            return res.text().then(value => Promise.reject(JSON.stringify({ code: res.status, error: value })))
        }
        return res.json();
    });
    const get = (path: string) => fetchElysia(path);
    const post = (path: string, body: any) => fetchElysia(path, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const before = await get('/batches');

    expect(before).toStrictEqual({
        batchList: []
    })

    await post('/batches', BATCH);

    const after = await get('/batches');

    expect(after).toStrictEqual({
        batchList: [BATCH]
    })

    await post('/batches/allocate', ORDER_LINE);

    const batch = await get('/batches/allocations/' + ORDER_LINE.orderId);

    expect(batch).toStrictEqual({
        batch: {
            ...BATCH,
            allocations: [ORDER_LINE],
        }
    })
})