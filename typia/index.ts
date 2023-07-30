import type { OrderLine } from '../src/domain/Batch';
import typia from 'typia';

export const assertOrderLine = (body: unknown) => typia.assert<OrderLine>(body);
export const parseOrderLine = (text: string) => typia.assertParse<OrderLine>(text);