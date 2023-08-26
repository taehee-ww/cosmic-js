import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { Type as t } from '@sinclair/typebox';

import * as batchServices from '../../service/BatchServices';
import { FastifyBaseLogger, FastifyInstance, RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault } from 'fastify';
import FakeBatchRepo from '../../persistence/FakeBatchRepo';
import { batchDto, orderLineDto } from '../../schema/typebox/batch';
import FakeBatchUnitOfWork from '../../persistence/FakeBatchUnitOfWork';

const repo = FakeBatchRepo()

type FastifyTypebox = FastifyInstance<
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    RawReplyDefaultExpression<RawServerDefault>,
    FastifyBaseLogger,
    TypeBoxTypeProvider
>;
export default function (fastify: FastifyTypebox, _options: unknown, done: () => void) {
    fastify.get('/', {
        schema: {
            response: {
                200: t.Object({
                    batchList: t.Array(batchDto)
                })
            }
        }
    }, async () => {
        const batchList = await repo.list();
        return { batchList }
    })

    fastify.post('/', {
        schema: {
            body: batchDto,
            response: {
                201: t.Object({
                    batchId: t.String()
                })
            }
        }
    }, async (request, reply) => {
        const batch = request.body;
        await repo.add(batch);
        return reply.code(201)
            .send({ batchId: batch.id })
    })

    fastify.post('/allocate', {
        schema: {
            body: orderLineDto,
            response: {
                201: t.Object({
                    batchId: t.String()
                })
            }
        }
    }, async (request, reply) => {
        const line = request.body;

        const uow = FakeBatchUnitOfWork(repo)
        const batchId = await batchServices.allocate(line, uow);

        return reply.code(201).send({ batchId: batchId })
    })
    done()
};