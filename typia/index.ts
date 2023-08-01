import * as Batch from '../src/domain/Batch';
import typia from 'typia';

export const parseOrderLine = (text: string) => typia.assertParse<Batch.OrderLine>(text);

export const parseBatch = (text: string) => typia.assertParse<Batch.T>(text);

export const assertBatch = (data: unknown) => typia.assert<Batch.T>(data);