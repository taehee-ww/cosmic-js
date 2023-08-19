import * as Batch from '../src/domain/Batch';
import typia from 'typia';

type BatchT = Batch.T;

export const parseOrderLine = (text: string) => typia.assertParse<Batch.OrderLine>(text);

export const parseBatch = (text: string) => typia.assertParse<BatchT>(text);

export const assertBatch = (data: unknown) => typia.assert<BatchT>(data);

export const application = typia.application<[BatchT], 'swagger'>();
